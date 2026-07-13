import { Injectable, UnauthorizedException, ConflictException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Role, AccountStatus } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';

const SELF_REGISTERABLE_ROLES: Role[] = [Role.STUDENT, Role.PARENT];
const PRIVILEGED_ROLES: Role[] = [Role.ADMIN, Role.SUPERADMIN];
const OTP_TTL_MINUTES = 10;

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  private readonly secret = process.env.JWT_SECRET;

  private base64UrlEncode(str: string | Buffer): string {
    const base64 = Buffer.isBuffer(str) ? str.toString('base64') : Buffer.from(str).toString('base64');
    return base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  }

  private base64UrlDecode(str: string): string {
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) base64 += '=';
    return Buffer.from(base64, 'base64').toString('utf8');
  }

  signJwt(payload: any): string {
    if (!this.secret) throw new Error('JWT_SECRET environment variable is not set');
    const header = { alg: 'HS256', typ: 'JWT' };
    const encodedHeader = this.base64UrlEncode(JSON.stringify(header));
    const encodedPayload = this.base64UrlEncode(JSON.stringify(payload));

    const signatureInput = `${encodedHeader}.${encodedPayload}`;
    const signature = crypto.createHmac('sha256', this.secret).update(signatureInput).digest();

    const encodedSignature = this.base64UrlEncode(signature);
    return `${signatureInput}.${encodedSignature}`;
  }

  verifyJwt(token: string): any {
    if (!this.secret) return null;
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;

      const [headerPart, payloadPart, signaturePart] = parts;
      const signatureInput = `${headerPart}.${payloadPart}`;

      const expectedSignature = this.base64UrlEncode(
        crypto.createHmac('sha256', this.secret).update(signatureInput).digest(),
      );

      if (expectedSignature !== signaturePart) return null;

      const payload = JSON.parse(this.base64UrlDecode(payloadPart));
      if (payload.exp && Date.now() >= payload.exp * 1000) return null;

      return payload;
    } catch {
      return null;
    }
  }

  private issueTokenFor(user: { id: string; email: string; role: Role; name: string }) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
      exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
    };
    return this.signJwt(payload);
  }

  async register(input: { email: string; password: string; name: string; role?: Role; phoneNumber?: string }) {
    const { email, password, name } = input;
    const role = input.role ?? Role.STUDENT;

    if (!email || !password || !name) {
      throw new BadRequestException('email, password, and name are required');
    }
    if (password.length < 8) {
      throw new BadRequestException('Password must be at least 8 characters');
    }
    if (!SELF_REGISTERABLE_ROLES.includes(role)) {
      throw new BadRequestException(`Self-registration is not supported for role ${role} yet`);
    }

    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw new ConflictException('An account with this email already exists');
    }

    const passwordHash = await bcrypt.hash(password, 12);

    // There is no email/SMS provider yet, so an OTP can't actually reach a real
    // visitor. In demo mode we activate the account immediately rather than
    // stranding them at a verification step they can never pass.
    const demoMode = process.env.DEMO_MODE === 'true';

    const user = await this.prisma.$transaction(async (tx) => {
      const created = await tx.user.create({
        data: {
          email,
          name,
          passwordHash,
          role,
          phoneNumber: input.phoneNumber,
          status: demoMode ? AccountStatus.ACTIVE : AccountStatus.PENDING_VERIFICATION,
        },
      });

      if (role === Role.STUDENT) {
        await tx.studentProfile.create({ data: { userId: created.id, grade: 'Unspecified' } });
      } else if (role === Role.PARENT) {
        await tx.parentProfile.create({ data: { userId: created.id } });
      }

      return created;
    });

    if (demoMode) {
      return {
        message: 'Registration successful. You can sign in now.',
        email: user.email,
        autoActivated: true,
      };
    }

    const otpCode = crypto.randomInt(100000, 999999).toString();
    await this.prisma.userOTP.create({
      data: {
        userId: user.id,
        otpCode,
        expiresAt: new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000),
      },
    });

    console.log(`[auth] OTP for ${email}: ${otpCode} (expires in ${OTP_TTL_MINUTES}m)`);

    return {
      message: 'Registration successful. Check your email for a verification code.',
      email: user.email,
      ...(process.env.NODE_ENV !== 'production' ? { devOtp: otpCode } : {}),
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    const matches = await bcrypt.compare(password, user.passwordHash);
    if (!matches) return null;

    const { passwordHash: _, ...result } = user;
    return result;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) {
      // Deliberately identical for "no such user" and "wrong password" — telling
      // them apart would let an attacker enumerate registered emails.
      throw new UnauthorizedException('Incorrect email or password.');
    }
    if (user.status === AccountStatus.PENDING_VERIFICATION) {
      throw new UnauthorizedException('Please verify your account with the OTP sent to your email first');
    }
    if (user.status === AccountStatus.SUSPENDED) {
      throw new ForbiddenException('This account has been suspended');
    }

    return {
      access_token: this.issueTokenFor(user),
      user,
    };
  }

  async verifyOtp(email: string, otp: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const otpRecord = await this.prisma.userOTP.findFirst({
      where: { userId: user.id, otpCode: otp, verifiedAt: null },
      orderBy: { createdAt: 'desc' },
    });

    if (!otpRecord || otpRecord.expiresAt < new Date()) {
      throw new UnauthorizedException('Invalid or expired OTP code');
    }

    const [, updatedUser] = await this.prisma.$transaction([
      this.prisma.userOTP.update({ where: { id: otpRecord.id }, data: { verifiedAt: new Date() } }),
      this.prisma.user.update({
        where: { id: user.id },
        data: { status: user.status === AccountStatus.PENDING_VERIFICATION ? AccountStatus.ACTIVE : user.status },
      }),
    ]);

    const { passwordHash: _, ...safeUser } = updatedUser;

    return {
      access_token: this.issueTokenFor(updatedUser),
      user: safeUser,
    };
  }

  // --- Ownership checks (used by portal controllers alongside RolesGuard) ---

  async assertStudentAccess(requestUser: any, studentId: string) {
    if (PRIVILEGED_ROLES.includes(requestUser.role) || requestUser.role === Role.MENTOR || requestUser.role === Role.TEACHER) {
      return;
    }
    if (requestUser.role === Role.STUDENT) {
      const own = await this.prisma.studentProfile.findUnique({ where: { userId: requestUser.sub } });
      if (own && own.id === studentId) return;
    }
    if (requestUser.role === Role.PARENT) {
      const child = await this.prisma.studentProfile.findFirst({
        where: { id: studentId, parent: { userId: requestUser.sub } },
      });
      if (child) return;
    }
    throw new ForbiddenException('You do not have access to this student record');
  }

  async assertParentAccess(requestUser: any, parentId: string) {
    if (PRIVILEGED_ROLES.includes(requestUser.role)) return;
    if (requestUser.role === Role.PARENT) {
      const own = await this.prisma.parentProfile.findUnique({ where: { userId: requestUser.sub } });
      if (own && (own.id === parentId || requestUser.sub === parentId)) return;
    }
    throw new ForbiddenException('You do not have access to this parent record');
  }

  async assertMentorAccess(requestUser: any, mentorId: string) {
    if (PRIVILEGED_ROLES.includes(requestUser.role)) return;
    if (requestUser.role === Role.MENTOR) {
      const own = await this.prisma.mentorProfile.findUnique({ where: { userId: requestUser.sub } });
      if (own && (own.id === mentorId || requestUser.sub === mentorId)) return;
    }
    throw new ForbiddenException('You do not have access to this mentor record');
  }
}

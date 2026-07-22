import { Injectable } from '@nestjs/common';
import { PrismaService, RoleName, AccountStatus, SessionStatus } from '@vedhkrit/database';
import { IAuthRepository } from './auth.repository.interface';
import { UserEntity } from '../domain/entities/user.entity';
import { SessionEntity } from '../domain/entities/session.entity';
import { RefreshTokenEntity } from '../domain/entities/refresh-token.entity';
import { OtpEntity } from '../domain/entities/otp.entity';
import {
  CreateUserData,
  UpdateUserData,
  CreateSessionData,
  CreateRefreshTokenData,
  CreateOTPData,
  VerifyOTPData,
  SaveAuditLogData,
} from '../types/auth.types';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  private mapUserToEntity(user: any): UserEntity {
    return new UserEntity(
      user.id,
      user.email,
      user.name,
      user.passwordHash,
      user.role as RoleName,
      user.status as AccountStatus,
      user.phoneNumber,
      user.emailVerified,
      user.phoneVerified,
      user.lastLoginAt,
      user.failedLoginAttempts,
      user.lockedUntil,
      user.organizationId,
      user.schoolId,
      user.createdAt,
      user.updatedAt,
    );
  }

  private mapSessionToEntity(session: any): SessionEntity {
    return new SessionEntity(
      session.id,
      session.userId,
      session.expiresAt,
      session.status as SessionStatus,
      session.revoked,
      session.device,
      session.browser,
      session.os,
      session.ip,
      session.country,
      session.lastActivity,
      session.createdAt,
    );
  }

  private mapRefreshTokenToEntity(token: any): RefreshTokenEntity {
    return new RefreshTokenEntity(
      token.id,
      token.tokenHash,
      token.userId,
      token.sessionId,
      token.expiresAt,
      token.isRevoked,
      token.parentTokenHash,
      token.createdAt,
    );
  }

  private mapOtpToEntity(otp: any): OtpEntity {
    return new OtpEntity(
      otp.id,
      otp.target,
      otp.codeHash,
      otp.channel,
      otp.purpose,
      otp.expiresAt,
      otp.userId,
      otp.verifiedAt,
      otp.attempts,
      otp.maxAttempts,
      otp.createdAt,
    );
  }

  async findById(id: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user ? this.mapUserToEntity(user) : null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });
    return user ? this.mapUserToEntity(user) : null;
  }

  async findByPhone(phone: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { phoneNumber: phone.trim() },
    });
    return user ? this.mapUserToEntity(user) : null;
  }

  async createUser(data: CreateUserData): Promise<UserEntity> {
    const user = await this.prisma.user.create({
      data: {
        email: data.email.toLowerCase().trim(),
        phoneNumber: data.phoneNumber ? data.phoneNumber.trim() : null,
        name: data.name,
        passwordHash: data.passwordHash,
        role: data.role || RoleName.STUDENT,
        organizationId: data.organizationId,
        schoolId: data.schoolId,
      },
    });
    return this.mapUserToEntity(user);
  }

  async updateUser(id: string, data: UpdateUserData): Promise<UserEntity> {
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        ...(data.email && { email: data.email.toLowerCase().trim() }),
        ...(data.phoneNumber !== undefined && { phoneNumber: data.phoneNumber }),
        ...(data.name && { name: data.name }),
        ...(data.passwordHash && { passwordHash: data.passwordHash }),
        ...(data.role && { role: data.role }),
        ...(data.status && { status: data.status }),
        ...(data.emailVerified !== undefined && { emailVerified: data.emailVerified }),
        ...(data.phoneVerified !== undefined && { phoneVerified: data.phoneVerified }),
        ...(data.lastLoginAt !== undefined && { lastLoginAt: data.lastLoginAt }),
        ...(data.failedLoginAttempts !== undefined && { failedLoginAttempts: data.failedLoginAttempts }),
        ...(data.lockedUntil !== undefined && { lockedUntil: data.lockedUntil }),
        ...(data.updatedBy && { updatedBy: data.updatedBy }),
      },
    });
    return this.mapUserToEntity(user);
  }

  async assignRole(userId: string, roleName: string): Promise<void> {
    const role = await this.prisma.role.findUnique({ where: { name: roleName } });
    if (!role) return;

    await this.prisma.userRole.upsert({
      where: { userId_roleId: { userId, roleId: role.id } },
      create: { userId, roleId: role.id },
      update: {},
    });
  }

  async revokeRole(userId: string, roleName: string): Promise<void> {
    const role = await this.prisma.role.findUnique({ where: { name: roleName } });
    if (!role) return;

    await this.prisma.userRole.deleteMany({
      where: { userId, roleId: role.id },
    });
  }

  async createSession(data: CreateSessionData): Promise<SessionEntity> {
    const session = await this.prisma.session.create({
      data: {
        userId: data.userId,
        device: data.device,
        browser: data.browser,
        os: data.os,
        ip: data.ip,
        country: data.country,
        expiresAt: data.expiresAt,
        status: SessionStatus.ACTIVE,
      },
    });
    return this.mapSessionToEntity(session);
  }

  async revokeSession(sessionId: string): Promise<void> {
    await this.prisma.session.update({
      where: { id: sessionId },
      data: {
        revoked: true,
        status: SessionStatus.REVOKED,
      },
    });
  }

  async createRefreshToken(data: CreateRefreshTokenData): Promise<RefreshTokenEntity> {
    const token = await this.prisma.refreshToken.create({
      data: {
        userId: data.userId,
        sessionId: data.sessionId,
        tokenHash: data.tokenHash,
        expiresAt: data.expiresAt,
        parentTokenHash: data.parentTokenHash,
      },
    });
    return this.mapRefreshTokenToEntity(token);
  }

  async revokeRefreshToken(tokenHash: string): Promise<void> {
    await this.prisma.refreshToken.updateMany({
      where: { tokenHash },
      data: { isRevoked: true },
    });
  }

  async createOTP(data: CreateOTPData): Promise<OtpEntity> {
    const otp = await this.prisma.oTP.create({
      data: {
        userId: data.userId,
        target: data.target,
        codeHash: data.codeHash,
        channel: data.channel,
        purpose: data.purpose,
        expiresAt: data.expiresAt,
        maxAttempts: data.maxAttempts || 3,
      },
    });
    return this.mapOtpToEntity(otp);
  }

  async verifyOTP(data: VerifyOTPData): Promise<boolean> {
    const otpRecord = await this.prisma.oTP.findFirst({
      where: {
        target: data.target,
        purpose: data.purpose,
        verifiedAt: null,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!otpRecord) return false;

    if (otpRecord.codeHash === data.codeHash) {
      await this.prisma.oTP.update({
        where: { id: otpRecord.id },
        data: { verifiedAt: new Date() },
      });
      return true;
    }

    await this.prisma.oTP.update({
      where: { id: otpRecord.id },
      data: { attempts: { increment: 1 } },
    });

    return false;
  }

  async saveAuditLog(data: SaveAuditLogData): Promise<void> {
    await this.prisma.auditLog.create({
      data: {
        actorId: data.actorId,
        entity: data.entity,
        entityId: data.entityId,
        action: data.action,
        before: data.before,
        after: data.after,
        ip: data.ip,
        userAgent: data.userAgent,
        correlationId: data.correlationId,
      },
    });
  }
}

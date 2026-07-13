"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcryptjs"));
const crypto = __importStar(require("crypto"));
const SELF_REGISTERABLE_ROLES = [client_1.Role.STUDENT, client_1.Role.PARENT];
const PRIVILEGED_ROLES = [client_1.Role.ADMIN, client_1.Role.SUPERADMIN];
const OTP_TTL_MINUTES = 10;
let AuthService = class AuthService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    secret = process.env.JWT_SECRET;
    base64UrlEncode(str) {
        const base64 = Buffer.isBuffer(str) ? str.toString('base64') : Buffer.from(str).toString('base64');
        return base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    }
    base64UrlDecode(str) {
        let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
        while (base64.length % 4)
            base64 += '=';
        return Buffer.from(base64, 'base64').toString('utf8');
    }
    signJwt(payload) {
        if (!this.secret)
            throw new Error('JWT_SECRET environment variable is not set');
        const header = { alg: 'HS256', typ: 'JWT' };
        const encodedHeader = this.base64UrlEncode(JSON.stringify(header));
        const encodedPayload = this.base64UrlEncode(JSON.stringify(payload));
        const signatureInput = `${encodedHeader}.${encodedPayload}`;
        const signature = crypto.createHmac('sha256', this.secret).update(signatureInput).digest();
        const encodedSignature = this.base64UrlEncode(signature);
        return `${signatureInput}.${encodedSignature}`;
    }
    verifyJwt(token) {
        if (!this.secret)
            return null;
        try {
            const parts = token.split('.');
            if (parts.length !== 3)
                return null;
            const [headerPart, payloadPart, signaturePart] = parts;
            const signatureInput = `${headerPart}.${payloadPart}`;
            const expectedSignature = this.base64UrlEncode(crypto.createHmac('sha256', this.secret).update(signatureInput).digest());
            if (expectedSignature !== signaturePart)
                return null;
            const payload = JSON.parse(this.base64UrlDecode(payloadPart));
            if (payload.exp && Date.now() >= payload.exp * 1000)
                return null;
            return payload;
        }
        catch {
            return null;
        }
    }
    issueTokenFor(user) {
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
            name: user.name,
            exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
        };
        return this.signJwt(payload);
    }
    async register(input) {
        const { email, password, name } = input;
        const role = input.role ?? client_1.Role.STUDENT;
        if (!email || !password || !name) {
            throw new common_1.BadRequestException('email, password, and name are required');
        }
        if (password.length < 8) {
            throw new common_1.BadRequestException('Password must be at least 8 characters');
        }
        if (!SELF_REGISTERABLE_ROLES.includes(role)) {
            throw new common_1.BadRequestException(`Self-registration is not supported for role ${role} yet`);
        }
        const existing = await this.prisma.user.findUnique({ where: { email } });
        if (existing) {
            throw new common_1.ConflictException('An account with this email already exists');
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
                    status: demoMode ? client_1.AccountStatus.ACTIVE : client_1.AccountStatus.PENDING_VERIFICATION,
                },
            });
            if (role === client_1.Role.STUDENT) {
                await tx.studentProfile.create({ data: { userId: created.id, grade: 'Unspecified' } });
            }
            else if (role === client_1.Role.PARENT) {
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
    async validateUser(email, password) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user)
            return null;
        const matches = await bcrypt.compare(password, user.passwordHash);
        if (!matches)
            return null;
        const { passwordHash: _, ...result } = user;
        return result;
    }
    async login(email, password) {
        const user = await this.validateUser(email, password);
        if (!user) {
            // Deliberately identical for "no such user" and "wrong password" — telling
            // them apart would let an attacker enumerate registered emails.
            throw new common_1.UnauthorizedException('Incorrect email or password.');
        }
        if (user.status === client_1.AccountStatus.PENDING_VERIFICATION) {
            throw new common_1.UnauthorizedException('Please verify your account with the OTP sent to your email first');
        }
        if (user.status === client_1.AccountStatus.SUSPENDED) {
            throw new common_1.ForbiddenException('This account has been suspended');
        }
        return {
            access_token: this.issueTokenFor(user),
            user,
        };
    }
    async verifyOtp(email, otp) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        const otpRecord = await this.prisma.userOTP.findFirst({
            where: { userId: user.id, otpCode: otp, verifiedAt: null },
            orderBy: { createdAt: 'desc' },
        });
        if (!otpRecord || otpRecord.expiresAt < new Date()) {
            throw new common_1.UnauthorizedException('Invalid or expired OTP code');
        }
        const [, updatedUser] = await this.prisma.$transaction([
            this.prisma.userOTP.update({ where: { id: otpRecord.id }, data: { verifiedAt: new Date() } }),
            this.prisma.user.update({
                where: { id: user.id },
                data: { status: user.status === client_1.AccountStatus.PENDING_VERIFICATION ? client_1.AccountStatus.ACTIVE : user.status },
            }),
        ]);
        const { passwordHash: _, ...safeUser } = updatedUser;
        return {
            access_token: this.issueTokenFor(updatedUser),
            user: safeUser,
        };
    }
    // --- Ownership checks (used by portal controllers alongside RolesGuard) ---
    async assertStudentAccess(requestUser, studentId) {
        if (PRIVILEGED_ROLES.includes(requestUser.role) || requestUser.role === client_1.Role.MENTOR || requestUser.role === client_1.Role.TEACHER) {
            return;
        }
        if (requestUser.role === client_1.Role.STUDENT) {
            const own = await this.prisma.studentProfile.findUnique({ where: { userId: requestUser.sub } });
            if (own && own.id === studentId)
                return;
        }
        if (requestUser.role === client_1.Role.PARENT) {
            const child = await this.prisma.studentProfile.findFirst({
                where: { id: studentId, parent: { userId: requestUser.sub } },
            });
            if (child)
                return;
        }
        throw new common_1.ForbiddenException('You do not have access to this student record');
    }
    async assertParentAccess(requestUser, parentId) {
        if (PRIVILEGED_ROLES.includes(requestUser.role))
            return;
        if (requestUser.role === client_1.Role.PARENT) {
            const own = await this.prisma.parentProfile.findUnique({ where: { userId: requestUser.sub } });
            if (own && (own.id === parentId || requestUser.sub === parentId))
                return;
        }
        throw new common_1.ForbiddenException('You do not have access to this parent record');
    }
    async assertMentorAccess(requestUser, mentorId) {
        if (PRIVILEGED_ROLES.includes(requestUser.role))
            return;
        if (requestUser.role === client_1.Role.MENTOR) {
            const own = await this.prisma.mentorProfile.findUnique({ where: { userId: requestUser.sub } });
            if (own && (own.id === mentorId || requestUser.sub === mentorId))
                return;
        }
        throw new common_1.ForbiddenException('You do not have access to this mentor record');
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthService);

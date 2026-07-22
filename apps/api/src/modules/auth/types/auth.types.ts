import { RoleName, AccountStatus, OtpChannel, OtpPurpose, SessionStatus, AuditAction } from '@vedhkrit/database';

export interface CreateUserData {
  email: string;
  phoneNumber?: string;
  name: string;
  passwordHash: string;
  role?: RoleName;
  organizationId?: string;
  schoolId?: string;
}

export interface UpdateUserData {
  email?: string;
  phoneNumber?: string;
  name?: string;
  passwordHash?: string;
  role?: RoleName;
  status?: AccountStatus;
  emailVerified?: boolean;
  phoneVerified?: boolean;
  lastLoginAt?: Date;
  failedLoginAttempts?: number;
  lockedUntil?: Date | null;
  updatedBy?: string;
}

export interface CreateSessionData {
  userId: string;
  device?: string;
  browser?: string;
  os?: string;
  ip?: string;
  country?: string;
  expiresAt: Date;
}

export interface CreateRefreshTokenData {
  userId: string;
  sessionId: string;
  tokenHash: string;
  expiresAt: Date;
  parentTokenHash?: string;
}

export interface CreateOTPData {
  userId?: string;
  target: string;
  codeHash: string;
  channel: OtpChannel;
  purpose: OtpPurpose;
  expiresAt: Date;
  maxAttempts?: number;
}

export interface VerifyOTPData {
  target: string;
  purpose: OtpPurpose;
  codeHash: string;
}

export interface SaveAuditLogData {
  actorId?: string;
  entity: string;
  entityId?: string;
  action: AuditAction;
  before?: Record<string, any>;
  after?: Record<string, any>;
  ip?: string;
  userAgent?: string;
  correlationId?: string;
}

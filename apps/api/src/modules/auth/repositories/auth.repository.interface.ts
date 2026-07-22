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

export interface IAuthRepository {
  findById(id: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
  findByPhone(phone: string): Promise<UserEntity | null>;
  createUser(data: CreateUserData): Promise<UserEntity>;
  updateUser(id: string, data: UpdateUserData): Promise<UserEntity>;
  assignRole(userId: string, roleName: string): Promise<void>;
  revokeRole(userId: string, roleName: string): Promise<void>;
  createSession(data: CreateSessionData): Promise<SessionEntity>;
  revokeSession(sessionId: string): Promise<void>;
  createRefreshToken(data: CreateRefreshTokenData): Promise<RefreshTokenEntity>;
  revokeRefreshToken(tokenHash: string): Promise<void>;
  createOTP(data: CreateOTPData): Promise<OtpEntity>;
  verifyOTP(data: VerifyOTPData): Promise<boolean>;
  saveAuditLog(data: SaveAuditLogData): Promise<void>;
}

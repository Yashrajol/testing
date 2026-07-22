import { Provider } from '@nestjs/common';
import { AuthRepository } from './repositories/auth.repository';
import { AUTH_REPOSITORY_TOKEN } from './constants/auth.constants';

import { PasswordService } from './application/services/password.service';
import { OtpService } from './application/services/otp.service';
import { TokenService } from './application/services/token.service';
import { SessionService } from './application/services/session.service';
import { AuditService } from './application/services/audit.service';

import { RegisterUserHandler } from './application/handlers/register-user.handler';
import { LoginHandler } from './application/handlers/login.handler';
import { LogoutHandler } from './application/handlers/logout.handler';
import { VerifyOtpHandler } from './application/handlers/verify-otp.handler';
import { AssignRoleHandler } from './application/handlers/assign-role.handler';
import { RevokeRoleHandler } from './application/handlers/revoke-role.handler';
import { ForgotPasswordHandler } from './application/handlers/forgot-password.handler';
import { ResetPasswordHandler } from './application/handlers/reset-password.handler';
import { ResendOtpHandler } from './application/handlers/resend-otp.handler';
import { GetCurrentUserHandler } from './application/handlers/get-current-user.handler';
import { GetUserByIdHandler } from './application/handlers/get-user-by-id.handler';
import { GetUserPermissionsHandler } from './application/handlers/get-user-permissions.handler';

import { JwtStrategy } from './security/strategies/jwt.strategy';
import { JwtRefreshStrategy } from './security/strategies/jwt-refresh.strategy';
import { LocalStrategy } from './security/strategies/local.strategy';
import { JwtAuthGuard } from './security/guards/jwt-auth.guard';
import { RefreshTokenGuard } from './security/guards/refresh-token.guard';
import { LocalAuthGuard } from './security/guards/local-auth.guard';
import { RolesGuard } from './security/guards/roles.guard';
import { PermissionsGuard } from './security/guards/permissions.guard';
import { OptionalAuthGuard } from './security/guards/optional-auth.guard';
import { AuthExceptionFilter } from './security/filters/auth-exception.filter';
import { AuthAuditInterceptor } from './security/interceptors/auth-audit.interceptor';

export const AUTH_PROVIDERS: Provider[] = [
  AuthRepository,
  {
    provide: AUTH_REPOSITORY_TOKEN,
    useClass: AuthRepository,
  },
  AuthExceptionFilter,
  AuthAuditInterceptor,
  PasswordService,
  OtpService,
  TokenService,
  SessionService,
  AuditService,
  RegisterUserHandler,
  LoginHandler,
  LogoutHandler,
  VerifyOtpHandler,
  AssignRoleHandler,
  RevokeRoleHandler,
  ForgotPasswordHandler,
  ResetPasswordHandler,
  ResendOtpHandler,
  GetCurrentUserHandler,
  GetUserByIdHandler,
  GetUserPermissionsHandler,
  JwtStrategy,
  JwtRefreshStrategy,
  LocalStrategy,
  JwtAuthGuard,
  RefreshTokenGuard,
  LocalAuthGuard,
  RolesGuard,
  PermissionsGuard,
  OptionalAuthGuard,
];

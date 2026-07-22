import { Injectable, Inject } from '@nestjs/common';
import { AuditAction } from '@vedhkrit/database';
import { IAuthRepository } from '../../repositories/auth.repository.interface';
import { AUTH_REPOSITORY_TOKEN } from '../../constants/auth.constants';
import { LoginCommand } from '../commands/login.command';
import { AuthResponseDto } from '../dtos/user-response.dto';
import { UserMapper } from '../mappers/user.mapper';
import { PasswordService } from '../services/password.service';
import { TokenService } from '../services/token.service';
import { SessionService } from '../services/session.service';
import { AuditService } from '../services/audit.service';
import { UserAuthenticatedEvent } from '../../domain/events/user-authenticated.event';
import { InvalidCredentialsException } from '../../domain/exceptions/invalid-credentials.exception';

@Injectable()
export class LoginHandler {
  constructor(
    @Inject(AUTH_REPOSITORY_TOKEN)
    private readonly authRepository: IAuthRepository,
    private readonly passwordService: PasswordService,
    private readonly tokenService: TokenService,
    private readonly sessionService: SessionService,
    private readonly auditService: AuditService,
  ) {}

  async execute(command: LoginCommand): Promise<{ result: AuthResponseDto; event: UserAuthenticatedEvent }> {
    const isEmail = command.emailOrPhone.includes('@');
    const user = isEmail
      ? await this.authRepository.findByEmail(command.emailOrPhone)
      : await this.authRepository.findByPhone(command.emailOrPhone);

    if (!user) {
      throw new InvalidCredentialsException('Invalid login credentials provided.');
    }

    if (user.isLocked()) {
      throw new InvalidCredentialsException('Account is temporarily locked. Please try again later.');
    }

    if (user.isSuspended()) {
      throw new InvalidCredentialsException('Account is suspended. Please contact administrator.');
    }

    const isPasswordValid = await this.passwordService.comparePassword(command.password, user.passwordHash);

    if (!isPasswordValid) {
      const updatedAttempts = user.failedLoginAttempts + 1;
      const shouldLock = updatedAttempts >= 5;
      const lockedUntil = shouldLock ? new Date(Date.now() + 15 * 60 * 1000) : undefined;

      await this.authRepository.updateUser(user.id, {
        failedLoginAttempts: updatedAttempts,
        ...(lockedUntil && { lockedUntil }),
      });

      throw new InvalidCredentialsException('Invalid login credentials provided.');
    }

    await this.authRepository.updateUser(user.id, {
      failedLoginAttempts: 0,
      lockedUntil: null,
      lastLoginAt: new Date(),
    });

    const sessionExpiresAt = this.sessionService.calculateSessionExpiry();
    const session = await this.authRepository.createSession({
      userId: user.id,
      device: command.device,
      browser: command.browser,
      os: command.os,
      ip: command.ip,
      country: command.country,
      expiresAt: sessionExpiresAt,
    });

    const refreshTokenString = this.tokenService.generateRefreshTokenString();
    const refreshTokenHash = this.tokenService.hashRefreshToken(refreshTokenString);
    const refreshExpiresAt = this.sessionService.calculateRefreshTokenExpiry();

    await this.authRepository.createRefreshToken({
      userId: user.id,
      sessionId: session.id,
      tokenHash: refreshTokenHash,
      expiresAt: refreshExpiresAt,
    });

    const accessToken = this.tokenService.generateAccessToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      status: user.status,
      sessionId: session.id,
      organizationId: user.organizationId || undefined,
      schoolId: user.schoolId || undefined,
    });

    await this.auditService.logAuthEvent(
      AuditAction.LOGIN,
      user.id,
      'Session',
      session.id,
      command.ip,
      command.browser,
    );

    const event = new UserAuthenticatedEvent(user.id, session.id, command.ip, command.browser);

    return {
      result: {
        accessToken,
        refreshToken: refreshTokenString,
        sessionId: session.id,
        user: UserMapper.toResponseDto(user),
      },
      event,
    };
  }
}

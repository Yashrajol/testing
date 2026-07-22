import { Injectable, Inject } from '@nestjs/common';
import { OtpPurpose, AuditAction } from '@vedhkrit/database';
import { IAuthRepository } from '../../repositories/auth.repository.interface';
import { AUTH_REPOSITORY_TOKEN } from '../../constants/auth.constants';
import { ResetPasswordCommand } from '../commands/reset-password.command';
import { PasswordService } from '../services/password.service';
import { OtpService } from '../services/otp.service';
import { AuditService } from '../services/audit.service';
import { InvalidCredentialsException } from '../../domain/exceptions/invalid-credentials.exception';
import { UserNotFoundException } from '../../domain/exceptions/user-not-found.exception';

@Injectable()
export class ResetPasswordHandler {
  constructor(
    @Inject(AUTH_REPOSITORY_TOKEN)
    private readonly authRepository: IAuthRepository,
    private readonly passwordService: PasswordService,
    private readonly otpService: OtpService,
    private readonly auditService: AuditService,
  ) {}

  async execute(command: ResetPasswordCommand): Promise<void> {
    const isEmail = command.target.includes('@');
    const user = isEmail
      ? await this.authRepository.findByEmail(command.target)
      : await this.authRepository.findByPhone(command.target);

    if (!user) {
      throw new UserNotFoundException(command.target);
    }

    const codeHash = this.otpService.hashCode(command.otpCode);
    const verified = await this.authRepository.verifyOTP({
      target: command.target,
      purpose: OtpPurpose.PASSWORD_RESET,
      codeHash,
    });

    if (!verified) {
      throw new InvalidCredentialsException('OTP verification failed or code expired.');
    }

    const newPasswordHash = await this.passwordService.hashPassword(command.newPassword);
    await this.authRepository.updateUser(user.id, {
      passwordHash: newPasswordHash,
      failedLoginAttempts: 0,
      lockedUntil: null,
    });

    await this.auditService.logAuthEvent(
      AuditAction.PASSWORD_RESET,
      user.id,
      'User',
      user.id,
      undefined,
      undefined,
      undefined,
      { action: 'PASSWORD_RESET' },
    );
  }
}

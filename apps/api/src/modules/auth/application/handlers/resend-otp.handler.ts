import { Injectable, Inject } from '@nestjs/common';
import { IAuthRepository } from '../../repositories/auth.repository.interface';
import { AUTH_REPOSITORY_TOKEN, AUTH_DEFAULTS } from '../../constants/auth.constants';
import { ResendOtpCommand } from '../commands/resend-otp.command';
import { OtpService } from '../services/otp.service';

@Injectable()
export class ResendOtpHandler {
  constructor(
    @Inject(AUTH_REPOSITORY_TOKEN)
    private readonly authRepository: IAuthRepository,
    private readonly otpService: OtpService,
  ) {}

  async execute(command: ResendOtpCommand): Promise<{ code: string; expiresAt: Date }> {
    const isEmail = command.target.includes('@');
    const user = isEmail
      ? await this.authRepository.findByEmail(command.target)
      : await this.authRepository.findByPhone(command.target);

    const rawCode = this.otpService.generateCode(6);
    const codeHash = this.otpService.hashCode(rawCode);
    const expiresAt = new Date(Date.now() + AUTH_DEFAULTS.OTP_EXPIRY_MINUTES * 60 * 1000);

    await this.authRepository.createOTP({
      userId: user?.id,
      target: command.target,
      codeHash,
      channel: command.channel,
      purpose: command.purpose,
      expiresAt,
    });

    return { code: rawCode, expiresAt };
  }
}

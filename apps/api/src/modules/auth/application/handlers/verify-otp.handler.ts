import { Injectable, Inject } from '@nestjs/common';
import { IAuthRepository } from '../../repositories/auth.repository.interface';
import { AUTH_REPOSITORY_TOKEN } from '../../constants/auth.constants';
import { VerifyOtpCommand } from '../commands/verify-otp.command';
import { OtpService } from '../services/otp.service';
import { InvalidCredentialsException } from '../../domain/exceptions/invalid-credentials.exception';

@Injectable()
export class VerifyOtpHandler {
  constructor(
    @Inject(AUTH_REPOSITORY_TOKEN)
    private readonly authRepository: IAuthRepository,
    private readonly otpService: OtpService,
  ) {}

  async execute(command: VerifyOtpCommand): Promise<boolean> {
    const codeHash = this.otpService.hashCode(command.code);
    const verified = await this.authRepository.verifyOTP({
      target: command.target,
      purpose: command.purpose,
      codeHash,
    });

    if (!verified) {
      throw new InvalidCredentialsException('OTP verification failed or code has expired.');
    }

    return true;
  }
}

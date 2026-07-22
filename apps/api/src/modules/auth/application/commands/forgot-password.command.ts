import { OtpChannel } from '@vedhkrit/database';

export class ForgotPasswordCommand {
  constructor(
    public readonly target: string,
    public readonly channel: OtpChannel = OtpChannel.EMAIL,
  ) {}
}

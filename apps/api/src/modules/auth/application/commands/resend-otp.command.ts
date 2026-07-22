import { OtpChannel, OtpPurpose } from '@vedhkrit/database';

export class ResendOtpCommand {
  constructor(
    public readonly target: string,
    public readonly purpose: OtpPurpose,
    public readonly channel: OtpChannel = OtpChannel.EMAIL,
  ) {}
}

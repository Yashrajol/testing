import { OtpPurpose } from '@vedhkrit/database';

export class VerifyOtpCommand {
  constructor(
    public readonly target: string,
    public readonly code: string,
    public readonly purpose: OtpPurpose,
  ) {}
}

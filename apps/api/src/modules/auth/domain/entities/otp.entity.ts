import { OtpChannel, OtpPurpose } from '@vedhkrit/database';

export class OtpEntity {
  constructor(
    public readonly id: string,
    public readonly target: string,
    public readonly codeHash: string,
    public readonly channel: OtpChannel,
    public readonly purpose: OtpPurpose,
    public expiresAt: Date,
    public userId?: string | null,
    public verifiedAt?: Date | null,
    public attempts: number = 0,
    public maxAttempts: number = 3,
    public readonly createdAt: Date = new Date(),
  ) {}

  isExpired(): boolean {
    return this.expiresAt.getTime() <= Date.now();
  }

  isVerified(): boolean {
    return !!this.verifiedAt;
  }

  hasExceededAttempts(): boolean {
    return this.attempts >= this.maxAttempts;
  }

  isValid(): boolean {
    return !this.isVerified() && !this.isExpired() && !this.hasExceededAttempts();
  }
}

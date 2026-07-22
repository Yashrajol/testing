export class RefreshTokenEntity {
  constructor(
    public readonly id: string,
    public readonly tokenHash: string,
    public readonly userId: string,
    public readonly sessionId: string,
    public expiresAt: Date,
    public isRevoked: boolean = false,
    public parentTokenHash?: string | null,
    public readonly createdAt: Date = new Date(),
  ) {}

  isExpired(): boolean {
    return this.expiresAt.getTime() <= Date.now();
  }

  isValid(): boolean {
    return !this.isRevoked && !this.isExpired();
  }
}

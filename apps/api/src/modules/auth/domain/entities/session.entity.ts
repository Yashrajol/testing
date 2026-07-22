import { SessionStatus } from '@vedhkrit/database';

export class SessionEntity {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public expiresAt: Date,
    public status: SessionStatus = SessionStatus.ACTIVE,
    public revoked: boolean = false,
    public device?: string | null,
    public browser?: string | null,
    public os?: string | null,
    public ip?: string | null,
    public country?: string | null,
    public lastActivity: Date = new Date(),
    public readonly createdAt: Date = new Date(),
  ) {}

  isExpired(): boolean {
    return this.expiresAt.getTime() <= Date.now();
  }

  isValid(): boolean {
    return !this.revoked && this.status === SessionStatus.ACTIVE && !this.isExpired();
  }
}

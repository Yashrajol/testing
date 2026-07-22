import { RoleName, AccountStatus } from '@vedhkrit/database';

export class UserEntity {
  constructor(
    public readonly id: string,
    public email: string,
    public name: string,
    public passwordHash: string,
    public role: RoleName,
    public status: AccountStatus,
    public phoneNumber?: string | null,
    public emailVerified: boolean = false,
    public phoneVerified: boolean = false,
    public lastLoginAt?: Date | null,
    public failedLoginAttempts: number = 0,
    public lockedUntil?: Date | null,
    public organizationId?: string | null,
    public schoolId?: string | null,
    public readonly createdAt?: Date,
    public updatedAt?: Date,
  ) {}

  isLocked(): boolean {
    if (!this.lockedUntil) return false;
    return this.lockedUntil.getTime() > Date.now();
  }

  isSuspended(): boolean {
    return this.status === AccountStatus.SUSPENDED;
  }

  isActive(): boolean {
    return this.status === AccountStatus.ACTIVE && !this.isLocked();
  }
}

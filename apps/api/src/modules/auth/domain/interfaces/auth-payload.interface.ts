import { RoleName, AccountStatus } from '@vedhkrit/database';

export interface AuthPayload {
  userId: string;
  email: string;
  name: string;
  role: RoleName;
  status: AccountStatus;
  sessionId?: string;
  organizationId?: string;
  schoolId?: string;
}

export interface TokenClaims {
  sub: string;
  email: string;
  role: RoleName;
  sessionId: string;
  iat?: number;
  exp?: number;
}

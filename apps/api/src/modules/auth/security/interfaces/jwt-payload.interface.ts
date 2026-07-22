import { RoleName } from '@vedhkrit/database';

export interface JwtPayload {
  sub: string;
  email: string;
  role: RoleName;
  sessionId: string;
  organizationId?: string | null;
  schoolId?: string | null;
  iat?: number;
  exp?: number;
}

export interface JwtRefreshPayload {
  sub: string;
  sessionId: string;
  refreshTokenHash: string;
  iat?: number;
  exp?: number;
}

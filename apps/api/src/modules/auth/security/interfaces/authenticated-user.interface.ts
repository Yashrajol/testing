import { RoleName, AccountStatus } from '@vedhkrit/database';

export interface AuthenticatedUser {
  id: string;
  email: string;
  name: string;
  role: RoleName;
  status: AccountStatus;
  sessionId: string;
  permissions: string[];
  organizationId?: string | null;
  schoolId?: string | null;
}

import { RoleName } from '@vedhkrit/database';

export const IS_PUBLIC_KEY = 'isPublic';
export const ROLES_KEY = 'roles';
export const PERMISSIONS_KEY = 'permissions';

export const STRATEGY_JWT = 'jwt';
export const STRATEGY_JWT_REFRESH = 'jwt-refresh';
export const STRATEGY_LOCAL = 'local';

export const ROLE_HIERARCHY: Record<RoleName, number> = {
  [RoleName.SUPERADMIN]: 100,
  [RoleName.ADMIN]: 90,
  [RoleName.ORGANIZATION_ADMIN]: 80,
  [RoleName.SCHOOL_ADMIN]: 70,
  [RoleName.MENTOR]: 50,
  [RoleName.TEACHER]: 50,
  [RoleName.PARENT]: 30,
  [RoleName.STUDENT]: 10,
};

import { RoleName } from '@vedhkrit/database';
import { ROLE_HIERARCHY } from '../constants/security.constants';

export class PermissionUtil {
  static isSuperAdmin(role: RoleName): boolean {
    return role === RoleName.SUPERADMIN;
  }

  static hasRoleLevel(userRole: RoleName, requiredRole: RoleName): boolean {
    const userLevel = ROLE_HIERARCHY[userRole] || 0;
    const requiredLevel = ROLE_HIERARCHY[requiredRole] || 0;
    return userLevel >= requiredLevel;
  }

  static hasPermission(userPermissions: string[], requiredPermission: string): boolean {
    if (userPermissions.includes('*') || userPermissions.includes('*:*')) {
      return true;
    }

    if (userPermissions.includes(requiredPermission)) {
      return true;
    }

    const [resource] = requiredPermission.split(':');
    if (resource && userPermissions.includes(`${resource}:*`)) {
      return true;
    }

    return false;
  }
}

import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleName } from '@vedhkrit/database';
import { ROLES_KEY, IS_PUBLIC_KEY } from '../constants/security.constants';
import { AuthenticatedUser } from '../interfaces/authenticated-user.interface';
import { PermissionUtil } from '../utils/permission.util';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const requiredRoles = this.reflector.getAllAndOverride<RoleName[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user: AuthenticatedUser = request.user;

    if (!user) {
      throw new ForbiddenException('User context missing for role evaluation.');
    }

    if (PermissionUtil.isSuperAdmin(user.role)) {
      return true;
    }

    const hasPermissionRole = requiredRoles.some((role) =>
      PermissionUtil.hasRoleLevel(user.role, role),
    );

    if (!hasPermissionRole) {
      throw new ForbiddenException(`Insufficient role permissions. Required: ${requiredRoles.join(', ')}`);
    }

    return true;
  }
}

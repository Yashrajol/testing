import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY, IS_PUBLIC_KEY } from '../constants/security.constants';
import { AuthenticatedUser } from '../interfaces/authenticated-user.interface';
import { PermissionUtil } from '../utils/permission.util';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user: AuthenticatedUser = request.user;

    if (!user) {
      throw new ForbiddenException('User context missing for permission evaluation.');
    }

    if (PermissionUtil.isSuperAdmin(user.role)) {
      return true;
    }

    const hasAllPermissions = requiredPermissions.every((permission) =>
      PermissionUtil.hasPermission(user.permissions || [], permission),
    );

    if (!hasAllPermissions) {
      throw new ForbiddenException(`Insufficient resource permissions. Required: ${requiredPermissions.join(', ')}`);
    }

    return true;
  }
}

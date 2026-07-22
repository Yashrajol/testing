import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { RoleName } from '@vedhkrit/database';

@Injectable()
export class OrganizationTenantGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('User context missing for tenant evaluation.');
    }

    if (user.role === RoleName.SUPERADMIN) {
      return true;
    }

    const requestedOrgId = request.params.id || request.body.organizationId || request.query.organizationId;
    if (requestedOrgId && user.organizationId && user.organizationId !== requestedOrgId) {
      throw new ForbiddenException('Access denied: Multi-tenant organization boundaries violated.');
    }

    return true;
  }
}

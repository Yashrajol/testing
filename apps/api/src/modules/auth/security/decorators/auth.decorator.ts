import { applyDecorators, UseGuards } from '@nestjs/common';
import { RoleName } from '@vedhkrit/database';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { PermissionsGuard } from '../guards/permissions.guard';
import { Roles } from './roles.decorator';
import { Permissions } from './permissions.decorator';

export function Auth(options?: { roles?: RoleName[]; permissions?: string[] }) {
  const decorators: Array<ClassDecorator | MethodDecorator | PropertyDecorator> = [
    UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard),
  ];

  if (options?.roles && options.roles.length > 0) {
    decorators.push(Roles(...options.roles));
  }

  if (options?.permissions && options.permissions.length > 0) {
    decorators.push(Permissions(...options.permissions));
  }

  return applyDecorators(...decorators);
}

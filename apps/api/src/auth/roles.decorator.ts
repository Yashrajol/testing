import { SetMetadata } from '@nestjs/common';
import { RoleName as Role } from '@vedhkrit/database';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

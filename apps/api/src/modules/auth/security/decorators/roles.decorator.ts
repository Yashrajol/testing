import { SetMetadata } from '@nestjs/common';
import { RoleName } from '@vedhkrit/database';
import { ROLES_KEY } from '../constants/security.constants';

export const Roles = (...roles: RoleName[]) => SetMetadata(ROLES_KEY, roles);

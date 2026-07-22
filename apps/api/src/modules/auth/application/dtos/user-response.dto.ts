import { RoleName, AccountStatus } from '@vedhkrit/database';

export class UserResponseDto {
  id!: string;
  email!: string;
  name!: string;
  role!: RoleName;
  status!: AccountStatus;
  phoneNumber?: string | null;
  emailVerified!: boolean;
  phoneVerified!: boolean;
  organizationId?: string | null;
  schoolId?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export class AuthResponseDto {
  accessToken!: string;
  refreshToken!: string;
  sessionId!: string;
  user!: UserResponseDto;
}

export class PermissionResponseDto {
  userId!: string;
  role!: RoleName;
  permissions!: string[];
}

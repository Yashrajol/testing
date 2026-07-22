import { ProfileType } from '../../constants/identity.constants';

export class ProfileResponseDto {
  id!: string;
  userId!: string;
  type!: ProfileType;
  firstName?: string | null;
  middleName?: string | null;
  lastName?: string | null;
  fullName?: string;
  gender?: string | null;
  dateOfBirth?: Date | null;
  profilePhoto?: string | null;
  address?: string | null;
  emergencyContact?: string | null;
  bloodGroup?: string | null;
  nationality?: string | null;
  language?: string | null;
  timezone?: string | null;
  metadata?: Record<string, any> | null;
  specifics?: Record<string, any>;
  createdAt!: Date;
  updatedAt!: Date;
}

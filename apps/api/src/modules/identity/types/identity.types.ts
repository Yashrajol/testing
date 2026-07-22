import { ProfileType } from '../constants/identity.constants';

export interface BaseProfileProps {
  id: string;
  userId: string;
  firstName?: string | null;
  middleName?: string | null;
  lastName?: string | null;
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
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export interface ProfileFilterOptions {
  type: ProfileType;
  organizationId?: string;
  schoolId?: string;
  search?: string;
  skip?: number;
  take?: number;
}

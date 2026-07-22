import { ProfileType } from '../constants/identity.constants';
import { ProfileFilterOptions } from '../types/identity.types';

export interface IIdentityRepository {
  findProfileByUserId(userId: string, type: ProfileType): Promise<any | null>;
  createProfile(userId: string, type: ProfileType, data: any): Promise<any>;
  updateProfile(userId: string, type: ProfileType, data: any): Promise<any>;
  softDeleteProfile(userId: string, type: ProfileType): Promise<void>;
  findProfiles(options: ProfileFilterOptions): Promise<{ items: any[]; total: number }>;
}

import { apiClient } from '@/shared/api/axios';
import { Subject, AcademicEntityResponse } from '../types';

export const AcademicsService = {
  async getSubjects(): Promise<AcademicEntityResponse> {
    return (await apiClient.get('/api/v1/academics/entities')) as any;
  },

  async getSubject(id: string): Promise<Subject> {
    return (await apiClient.get(`/api/v1/academics/entities/${id}`)) as any;
  },
};

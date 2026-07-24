import { apiClient } from '@/shared/api/axios';
import { Subject, AcademicEntityResponse } from '../types';

export const AcademicsService = {
  async getSubjects(): Promise<Subject[]> {
    const res = (await apiClient.get('/api/v1/academics/entities')) as any;
    if (Array.isArray(res)) return res;
    if (res && Array.isArray(res.items)) return res.items;
    if (res && Array.isArray(res.data)) return res.data;
    if (res && Array.isArray(res.entities)) return res.entities;
    return [];
  },

  async getSubject(id: string): Promise<Subject> {
    return (await apiClient.get(`/api/v1/academics/entities/${id}`)) as any;
  },
};

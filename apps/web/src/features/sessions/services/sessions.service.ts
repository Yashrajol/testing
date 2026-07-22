import { apiClient } from '@/shared/api/axios';
import { StudySession } from '../types';

export const SessionsService = {
  async getStudentSessions(studentId: string): Promise<StudySession[]> {
    return (await apiClient.get(`/api/v1/sessions/${studentId}`)) as any;
  },
};

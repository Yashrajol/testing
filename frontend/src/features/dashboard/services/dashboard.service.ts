import { apiClient } from '@/shared/api/axios';
import { StudentDashboardResponse } from '../types';

export const DashboardService = {
  async getStudentDashboard(studentId: string): Promise<StudentDashboardResponse> {
    return (await apiClient.get(`/api/v1/gateway/dashboard/student/${studentId}`)) as any;
  },
};

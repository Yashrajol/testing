import { apiClient } from '@/shared/api/axios';
import {
  AnalyticsSummary,
  ReportItem,
  ExportRequest,
  ExportResult,
} from '../types';

export const AnalyticsService = {
  async getStudentAnalytics(studentId?: string): Promise<AnalyticsSummary> {
    const url = studentId
      ? `/api/v1/analytics/student/${studentId}`
      : '/api/v1/analytics/student';
    return (await apiClient.get(url)) as any;
  },

  async getParentAnalytics(parentId?: string): Promise<AnalyticsSummary> {
    const url = parentId
      ? `/api/v1/analytics/parent/${parentId}`
      : '/api/v1/analytics/parent';
    return (await apiClient.get(url)) as any;
  },

  async getMentorAnalytics(mentorId?: string): Promise<AnalyticsSummary> {
    const url = mentorId
      ? `/api/v1/analytics/mentor/${mentorId}`
      : '/api/v1/analytics/mentor';
    return (await apiClient.get(url)) as any;
  },

  async getAdminAnalytics(): Promise<AnalyticsSummary> {
    return (await apiClient.get('/api/v1/analytics/admin')) as any;
  },

  async getPlatformAnalytics(): Promise<AnalyticsSummary> {
    return (await apiClient.get('/api/v1/analytics/platform')) as any;
  },

  async getReports(): Promise<ReportItem[]> {
    return (await apiClient.get('/api/v1/reports')) as any;
  },

  async exportReport(payload: ExportRequest): Promise<ExportResult> {
    return (await apiClient.post('/api/v1/reports/export', payload)) as any;
  },
};

import { apiClient } from '@/shared/api/axios';
import { 
  ParentOverview, 
  AttendanceSummary, 
  AcademicProgress, 
  AssignmentSummary, 
  AssessmentSummary, 
  GrowthSnapshot, 
  ParentNotification 
} from '../types';

export const ParentService = {
  async getOverview(studentId?: string): Promise<ParentOverview> {
    const url = studentId && studentId !== 'student-123' ? `/api/v1/parent/overview/${studentId}` : `/api/v1/parent/overview`;
    return (await apiClient.get(url)) as any;
  },


  async getAttendance(studentId: string): Promise<AttendanceSummary> {
    if (!studentId) return {} as any;
    return (await apiClient.get(`/api/v1/parent/attendance/${studentId}`)) as any;
  },

  async getAcademics(studentId: string): Promise<AcademicProgress> {
    if (!studentId) return {} as any;
    return (await apiClient.get(`/api/v1/parent/academics/${studentId}`)) as any;
  },

  async getAssignments(studentId: string): Promise<AssignmentSummary[]> {
    if (!studentId) return [] as any;
    return (await apiClient.get(`/api/v1/parent/assignments/${studentId}`)) as any;
  },

  async getAssessments(studentId: string): Promise<AssessmentSummary[]> {
    if (!studentId) return [] as any;
    return (await apiClient.get(`/api/v1/parent/assessments/${studentId}`)) as any;
  },

  async getGrowth(studentId: string): Promise<GrowthSnapshot> {
    if (!studentId) return {} as any;
    return (await apiClient.get(`/api/v1/parent/growth/${studentId}`)) as any;
  },

  async getNotifications(studentId: string): Promise<ParentNotification[]> {
    if (!studentId) return [] as any;
    return (await apiClient.get(`/api/v1/parent/notifications/${studentId}`)) as any;
  },
};

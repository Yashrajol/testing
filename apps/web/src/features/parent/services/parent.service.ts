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
  async getOverview(studentId: string): Promise<ParentOverview> {
    return (await apiClient.get(`/api/v1/parent/overview/${studentId}`)) as any;
  },

  async getAttendance(studentId: string): Promise<AttendanceSummary> {
    return (await apiClient.get(`/api/v1/parent/attendance/${studentId}`)) as any;
  },

  async getAcademics(studentId: string): Promise<AcademicProgress> {
    return (await apiClient.get(`/api/v1/parent/academics/${studentId}`)) as any;
  },

  async getAssignments(studentId: string): Promise<AssignmentSummary[]> {
    return (await apiClient.get(`/api/v1/parent/assignments/${studentId}`)) as any;
  },

  async getAssessments(studentId: string): Promise<AssessmentSummary[]> {
    return (await apiClient.get(`/api/v1/parent/assessments/${studentId}`)) as any;
  },

  async getGrowth(studentId: string): Promise<GrowthSnapshot> {
    return (await apiClient.get(`/api/v1/parent/growth/${studentId}`)) as any;
  },

  async getNotifications(studentId: string): Promise<ParentNotification[]> {
    return (await apiClient.get(`/api/v1/parent/notifications/${studentId}`)) as any;
  },
};

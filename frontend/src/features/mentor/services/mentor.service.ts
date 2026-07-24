import { apiClient } from '@/shared/api/axios';
import {
  MentorDashboard,
  MentorStudent,
  StudentOverview,
  StudentAttendance,
  StudentAssignment,
  StudentAssessment,
  MentorSession,
  LearningDNASummary,
  GrowthSummary,
  MentorFeedback,
  MentorNote,
  MentorNotification,
  AIInsight,
} from '../types';

export const MentorService = {
  async getDashboard(): Promise<MentorDashboard> {
    return (await apiClient.get('/api/v1/mentor/dashboard')) as any;
  },

  async getStudents(): Promise<MentorStudent[]> {
    return (await apiClient.get('/api/v1/mentor/students')) as any;
  },

  async getStudent(studentId: string): Promise<StudentOverview> {
    return (await apiClient.get(`/api/v1/mentor/students/${studentId}`)) as any;
  },

  async getSessions(): Promise<MentorSession[]> {
    return (await apiClient.get('/api/v1/mentor/sessions')) as any;
  },

  async createSession(payload: {
    studentId: string;
    topic: string;
    scheduledAt: string;
    durationMinutes?: number;
  }): Promise<MentorSession> {
    return (await apiClient.post('/api/v1/mentor/sessions', payload)) as any;
  },

  async updateSession(
    sessionId: string,
    payload: Partial<MentorSession>
  ): Promise<MentorSession> {
    return (await apiClient.put(`/api/v1/mentor/sessions/${sessionId}`, payload)) as any;
  },

  async getAttendance(): Promise<StudentAttendance[]> {
    return (await apiClient.get('/api/v1/mentor/attendance')) as any;
  },

  async getAssignments(): Promise<StudentAssignment[]> {
    return (await apiClient.get('/api/v1/mentor/assignments')) as any;
  },

  async reviewAssignment(
    assignmentId: string,
    payload: { score: number; feedback: string }
  ): Promise<StudentAssignment> {
    return (await apiClient.put(
      `/api/v1/mentor/assignments/${assignmentId}/review`,
      payload
    )) as any;
  },

  async getAssessments(): Promise<StudentAssessment[]> {
    return (await apiClient.get('/api/v1/mentor/assessments')) as any;
  },

  async reviewAssessment(
    attemptId: string,
    payload: { score?: number; mentorFeedback: string }
  ): Promise<StudentAssessment> {
    return (await apiClient.put(
      `/api/v1/mentor/assessments/${attemptId}/review`,
      payload
    )) as any;
  },

  async getLearningDNA(studentId: string): Promise<LearningDNASummary> {
    return (await apiClient.get(`/api/v1/mentor/learning-dna/${studentId}`)) as any;
  },

  async getGrowth(studentId: string): Promise<GrowthSummary> {
    return (await apiClient.get(`/api/v1/mentor/growth/${studentId}`)) as any;
  },

  async submitFeedback(payload: {
    studentId: string;
    rating: number;
    title: string;
    comment: string;
  }): Promise<MentorFeedback> {
    return (await apiClient.post('/api/v1/mentor/feedback', payload)) as any;
  },

  async getNotes(studentId: string): Promise<MentorNote[]> {
    return (await apiClient.get(`/api/v1/mentor/notes/${studentId}`)) as any;
  },

  async createNote(payload: {
    studentId: string;
    content: string;
    tags?: string[];
  }): Promise<MentorNote> {
    return (await apiClient.post('/api/v1/mentor/notes', payload)) as any;
  },

  async getNotifications(): Promise<MentorNotification[]> {
    return (await apiClient.get('/api/v1/mentor/notifications')) as any;
  },

  async generateAIInsights(payload: {
    studentId?: string;
    prompt?: string;
    type?: string;
  }): Promise<AIInsight> {
    return (await apiClient.post('/api/v1/ai/mentor-insights', payload)) as any;
  },
};

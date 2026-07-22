import { apiClient } from '@/shared/api/axios';
import { Assessment, Attempt, Answer, AssessmentResult } from '../types';

export const AssessmentService = {
  async listAssessments(): Promise<Assessment[]> {
    return (await apiClient.get('/api/v1/assessments')) as any;
  },

  async getAssessment(id: string): Promise<Assessment> {
    return (await apiClient.get(`/api/v1/assessments/${id}`)) as any;
  },

  async startAttempt(id: string): Promise<Attempt> {
    return (await apiClient.post(`/api/v1/assessments/${id}/attempts/start`)) as any;
  },

  async saveAnswer(attemptId: string, answer: Answer): Promise<any> {
    return (await apiClient.post(`/api/v1/attempts/${attemptId}/answers`, answer)) as any;
  },

  async submitAttempt(attemptId: string): Promise<any> {
    return (await apiClient.post(`/api/v1/attempts/${attemptId}/submit`)) as any;
  },

  async getResult(attemptId: string): Promise<AssessmentResult> {
    return (await apiClient.get(`/api/v1/attempts/${attemptId}/result`)) as any;
  },
};

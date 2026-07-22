import { apiClient } from '@/shared/api/axios';
import { StudyPlan, CareerAdvice } from '../types';

export const AIService = {
  async generateStudyPlan(prompt: string, studentId: string): Promise<{ text: string; plan?: StudyPlan }> {
    return (await apiClient.post('/api/v1/ai/study-plan', { prompt, studentId })) as any;
  },

  async generateInsights(prompt: string, studentId: string): Promise<{ text: string }> {
    return (await apiClient.post('/api/v1/ai/insights', { prompt, studentId })) as any;
  },

  async generateCareerAdvice(prompt: string, studentId: string): Promise<{ text: string; advice?: CareerAdvice }> {
    return (await apiClient.post('/api/v1/ai/career-advice', { prompt, studentId })) as any;
  },

  async generateParentSummary(prompt: string, studentId: string): Promise<{ text: string }> {
    return (await apiClient.post('/api/v1/ai/parent-summary', { prompt, studentId })) as any;
  },
};

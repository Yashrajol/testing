import { apiClient } from '@/shared/api/axios';
import { GrowthIndex, CareerMatch, GrowthInsights, Goal, CreateGoalRequest } from '../types';

export const GrowthService = {
  async getGrowthIndex(studentId: string): Promise<GrowthIndex> {
    if (!studentId) return {} as any;
    return (await apiClient.get(`/api/v1/growth/index/${studentId}`)) as any;
  },

  async getCareers(studentId: string): Promise<CareerMatch[]> {
    if (!studentId) return [] as any;
    return (await apiClient.get(`/api/v1/growth/careers/${studentId}`)) as any;
  },

  async getInsights(studentId: string): Promise<GrowthInsights> {
    if (!studentId) return {} as any;
    return (await apiClient.get(`/api/v1/growth/insights/${studentId}`)) as any;
  },

  async getGoals(studentId: string): Promise<Goal[]> {
    if (!studentId) return [] as any;
    return (await apiClient.get(`/api/v1/growth/goals/${studentId}`)) as any;
  },

  async createGoal(req: CreateGoalRequest): Promise<Goal> {
    return (await apiClient.post('/api/v1/growth/goals', req)) as any;
  },
};

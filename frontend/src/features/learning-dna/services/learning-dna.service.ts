import { apiClient } from '@/shared/api/axios';
import { LearningDnaProfile, KnowledgeNode, CompetencyProfile } from '../types';

export const LearningDnaService = {
  async getLearningDna(studentId: string): Promise<LearningDnaProfile> {
    if (!studentId) return {} as any;
    return (await apiClient.get(`/api/v1/learning-dna/student/${studentId}`)) as any;
  },

  async getKnowledgeGraph(studentId: string): Promise<KnowledgeNode[]> {
    if (!studentId) return [] as any;
    return (await apiClient.get(`/api/v1/learning-dna/knowledge/${studentId}`)) as any;
  },

  async getCompetencyProfile(studentId: string): Promise<CompetencyProfile> {
    if (!studentId) return {} as any;
    return (await apiClient.get(`/api/v1/learning-dna/competency/${studentId}`)) as any;
  },
};

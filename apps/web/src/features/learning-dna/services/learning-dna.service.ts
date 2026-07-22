import { apiClient } from '@/shared/api/axios';
import { LearningDnaProfile, KnowledgeNode, CompetencyProfile } from '../types';

export const LearningDnaService = {
  async getLearningDna(studentId: string): Promise<LearningDnaProfile> {
    return (await apiClient.get(`/api/v1/learning-dna/student/${studentId}`)) as any;
  },

  async getKnowledgeGraph(studentId: string): Promise<KnowledgeNode[]> {
    return (await apiClient.get(`/api/v1/learning-dna/knowledge/${studentId}`)) as any;
  },

  async getCompetencyProfile(studentId: string): Promise<CompetencyProfile> {
    return (await apiClient.get(`/api/v1/learning-dna/competency/${studentId}`)) as any;
  },
};

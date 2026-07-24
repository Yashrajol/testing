import { useQuery } from '@tanstack/react-query';
import { LearningDnaService } from '../services/learning-dna.service';

export function useLearningDna(studentId: string) {
  return useQuery({
    queryKey: ['learning-dna', studentId] as const,
    queryFn: () => LearningDnaService.getLearningDna(studentId),
    enabled: !!studentId,
  });
}

export function useKnowledgeGraph(studentId: string) {
  return useQuery({
    queryKey: ['knowledge-graph', studentId] as const,
    queryFn: () => LearningDnaService.getKnowledgeGraph(studentId),
    enabled: !!studentId,
  });
}

export function useCompetencyProfile(studentId: string) {
  return useQuery({
    queryKey: ['competency-profile', studentId] as const,
    queryFn: () => LearningDnaService.getCompetencyProfile(studentId),
    enabled: !!studentId,
  });
}

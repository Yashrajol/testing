import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AssessmentService } from '../services/assessment.service';
import { Answer } from '../types';

export function useAssessments() {
  return useQuery({
    queryKey: ['assessments'] as const,
    queryFn: () => AssessmentService.listAssessments(),
  });
}

export function useAssessment(id: string | null) {
  return useQuery({
    queryKey: ['assessments', id] as const,
    queryFn: () => AssessmentService.getAssessment(id!),
    enabled: !!id,
  });
}

export function useStartAttempt() {
  return useMutation({
    mutationFn: (id: string) => AssessmentService.startAttempt(id),
  });
}

export function useSaveAnswer() {
  return useMutation({
    mutationFn: (data: { attemptId: string; answer: Answer }) =>
      AssessmentService.saveAnswer(data.attemptId, data.answer),
  });
}

export function useSubmitAttempt() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (attemptId: string) => AssessmentService.submitAttempt(attemptId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assessments'] });
    },
  });
}

export function useAssessmentResult(attemptId: string | null) {
  return useQuery({
    queryKey: ['attempts', attemptId, 'result'] as const,
    queryFn: () => AssessmentService.getResult(attemptId!),
    enabled: !!attemptId,
  });
}

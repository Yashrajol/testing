import { useMutation } from '@tanstack/react-query';
import { AIService } from '../services/ai.service';

export function useGenerateStudyPlan() {
  return useMutation({
    mutationFn: (data: { prompt: string; studentId: string }) =>
      AIService.generateStudyPlan(data.prompt, data.studentId),
  });
}

export function useGenerateInsights() {
  return useMutation({
    mutationFn: (data: { prompt: string; studentId: string }) =>
      AIService.generateInsights(data.prompt, data.studentId),
  });
}

export function useCareerAdvice() {
  return useMutation({
    mutationFn: (data: { prompt: string; studentId: string }) =>
      AIService.generateCareerAdvice(data.prompt, data.studentId),
  });
}

export function useParentSummary() {
  return useMutation({
    mutationFn: (data: { prompt: string; studentId: string }) =>
      AIService.generateParentSummary(data.prompt, data.studentId),
  });
}

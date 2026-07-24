import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { GrowthService } from '../services/growth.service';
import { CreateGoalRequest } from '../types';

export function useGrowthIndex(studentId: string) {
  return useQuery({
    queryKey: ['growth-index', studentId] as const,
    queryFn: () => GrowthService.getGrowthIndex(studentId),
    enabled: !!studentId,
  });
}

export function useCareerMatches(studentId: string) {
  return useQuery({
    queryKey: ['career-matches', studentId] as const,
    queryFn: () => GrowthService.getCareers(studentId),
    enabled: !!studentId,
  });
}

export function useGrowthInsights(studentId: string) {
  return useQuery({
    queryKey: ['growth-insights', studentId] as const,
    queryFn: () => GrowthService.getInsights(studentId),
    enabled: !!studentId,
  });
}

export function useGoals(studentId: string) {
  return useQuery({
    queryKey: ['goals', studentId] as const,
    queryFn: () => GrowthService.getGoals(studentId),
    enabled: !!studentId,
  });
}

export function useCreateGoal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (req: CreateGoalRequest) => GrowthService.createGoal(req),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['goals', variables.studentId] });
    },
  });
}

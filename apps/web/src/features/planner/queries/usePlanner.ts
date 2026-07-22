import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PlannerService } from '../services/planner.service';

export function useDailySchedule(studentId: string) {
  return useQuery({
    queryKey: ['daily-schedule', studentId] as const,
    queryFn: () => PlannerService.getDailySchedule(studentId),
    enabled: !!studentId,
  });
}

export function useWeeklySchedule(studentId: string) {
  return useQuery({
    queryKey: ['weekly-schedule', studentId] as const,
    queryFn: () => PlannerService.getWeeklySchedule(studentId),
    enabled: !!studentId,
  });
}

export function useCalendar() {
  return useQuery({
    queryKey: ['calendar'] as const,
    queryFn: () => PlannerService.getCalendar(),
  });
}

export function useCreateGoal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (goal: { studentId: string; title: string; desc: string }) =>
      PlannerService.createGoal(goal),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['goals', variables.studentId] });
    },
  });
}

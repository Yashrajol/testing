import { useQuery } from '@tanstack/react-query';
import { ParentService } from '../services/parent.service';

export function useParentOverview(studentId: string) {
  return useQuery({
    queryKey: ['parent-overview', studentId] as const,
    queryFn: () => ParentService.getOverview(studentId),
    enabled: !!studentId,
  });
}

export function useParentAttendance(studentId: string) {
  return useQuery({
    queryKey: ['parent-attendance', studentId] as const,
    queryFn: () => ParentService.getAttendance(studentId),
    enabled: !!studentId,
  });
}

export function useParentAcademics(studentId: string) {
  return useQuery({
    queryKey: ['parent-academics', studentId] as const,
    queryFn: () => ParentService.getAcademics(studentId),
    enabled: !!studentId,
  });
}

export function useParentAssignments(studentId: string) {
  return useQuery({
    queryKey: ['parent-assignments', studentId] as const,
    queryFn: () => ParentService.getAssignments(studentId),
    enabled: !!studentId,
  });
}

export function useParentAssessments(studentId: string) {
  return useQuery({
    queryKey: ['parent-assessments', studentId] as const,
    queryFn: () => ParentService.getAssessments(studentId),
    enabled: !!studentId,
  });
}

export function useParentGrowth(studentId: string) {
  return useQuery({
    queryKey: ['parent-growth', studentId] as const,
    queryFn: () => ParentService.getGrowth(studentId),
    enabled: !!studentId,
  });
}

export function useParentNotifications(studentId: string) {
  return useQuery({
    queryKey: ['parent-notifications', studentId] as const,
    queryFn: () => ParentService.getNotifications(studentId),
    enabled: !!studentId,
  });
}

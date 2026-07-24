import { useQuery, useMutation } from '@tanstack/react-query';
import { AnalyticsService } from '../services/analytics.service';
import { ExportRequest } from '../types';

export const ANALYTICS_QUERY_KEYS = {
  student: (id?: string) => ['analytics', 'student', id || 'self'] as const,
  parent: (id?: string) => ['analytics', 'parent', id || 'self'] as const,
  mentor: (id?: string) => ['analytics', 'mentor', id || 'self'] as const,
  admin: ['analytics', 'admin'] as const,
  platform: ['analytics', 'platform'] as const,
  reports: ['analytics', 'reports'] as const,
};

export function useStudentAnalytics(studentId?: string) {
  return useQuery({
    queryKey: ANALYTICS_QUERY_KEYS.student(studentId),
    queryFn: () => AnalyticsService.getStudentAnalytics(studentId),
    staleTime: 1000 * 60 * 5, // 5 mins cache
  });
}

export function useParentAnalytics(parentId?: string) {
  return useQuery({
    queryKey: ANALYTICS_QUERY_KEYS.parent(parentId),
    queryFn: () => AnalyticsService.getParentAnalytics(parentId),
    staleTime: 1000 * 60 * 5,
  });
}

export function useMentorAnalytics(mentorId?: string) {
  return useQuery({
    queryKey: ANALYTICS_QUERY_KEYS.mentor(mentorId),
    queryFn: () => AnalyticsService.getMentorAnalytics(mentorId),
    staleTime: 1000 * 60 * 5,
  });
}

export function useAdminAnalytics() {
  return useQuery({
    queryKey: ANALYTICS_QUERY_KEYS.admin,
    queryFn: () => AnalyticsService.getAdminAnalytics(),
    staleTime: 1000 * 60 * 5,
  });
}

export function usePlatformAnalytics() {
  return useQuery({
    queryKey: ANALYTICS_QUERY_KEYS.platform,
    queryFn: () => AnalyticsService.getPlatformAnalytics(),
    staleTime: 1000 * 60 * 5,
  });
}

export function useReports() {
  return useQuery({
    queryKey: ANALYTICS_QUERY_KEYS.reports,
    queryFn: () => AnalyticsService.getReports(),
  });
}

export function useExportReport() {
  return useMutation({
    mutationFn: (payload: ExportRequest) => AnalyticsService.exportReport(payload),
  });
}

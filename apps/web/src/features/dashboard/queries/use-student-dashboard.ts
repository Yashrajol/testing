import { useQuery } from '@tanstack/react-query';
import { DashboardService } from '../services/dashboard.service';
import { QUERY_KEYS } from '@/shared/api/query-keys';

export function useStudentDashboard(studentId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.dashboard.student(studentId),
    queryFn: () => DashboardService.getStudentDashboard(studentId),
    enabled: !!studentId,
  });
}

import { QueryClient } from '@tanstack/react-query';
import { SUPER_ADMIN_QUERY_KEYS } from '@/features/super-admin/queries';
import { MENTOR_QUERY_KEYS } from '@/features/mentor/queries';
import { ADMIN_QUERY_KEYS } from '@/features/admin/queries';
import { DashboardService } from '@/features/dashboard/services/dashboard.service';
import { SuperAdminService } from '@/features/super-admin/services/super-admin.service';
import { MentorService } from '@/features/mentor/services/mentor.service';
import { AdminService } from '@/features/admin/services/admin.service';
import { ParentService } from '@/features/parent/services/parent.service';
import { QUERY_KEYS } from '@/shared/api/query-keys';

export const RoutePrefetcher = {
  // Prefetch Student Portal Queries
  async prefetchStudentDashboard(queryClient: QueryClient, studentId: string = 'student-123') {
    await queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.dashboard.student(studentId),
      queryFn: () => DashboardService.getStudentDashboard(studentId),
      staleTime: 1000 * 60 * 5,
    });
  },

  // Prefetch Parent Portal Queries
  async prefetchParentDashboard(queryClient: QueryClient, parentId: string = 'parent-123') {
    await queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.dashboard.parent(parentId),
      queryFn: () => ParentService.getOverview(parentId),
      staleTime: 1000 * 60 * 5,
    });
  },

  // Prefetch Mentor Portal Queries
  async prefetchMentorDashboard(queryClient: QueryClient) {
    await queryClient.prefetchQuery({
      queryKey: MENTOR_QUERY_KEYS.dashboard,
      queryFn: () => MentorService.getDashboard(),
      staleTime: 1000 * 60 * 5,
    });
  },

  // Prefetch Admin Portal Queries
  async prefetchAdminDashboard(queryClient: QueryClient) {
    await queryClient.prefetchQuery({
      queryKey: ADMIN_QUERY_KEYS.dashboard,
      queryFn: () => AdminService.getDashboard(),
      staleTime: 1000 * 60 * 5,
    });
  },

  // Prefetch Super Admin Control Center Queries
  async prefetchSuperAdminDashboard(queryClient: QueryClient) {
    await queryClient.prefetchQuery({
      queryKey: SUPER_ADMIN_QUERY_KEYS.dashboard,
      queryFn: () => SuperAdminService.getDashboard(),
      staleTime: 1000 * 60 * 5,
    });
  },
};

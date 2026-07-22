import { QueryClient } from '@tanstack/react-query';
import { STUDENT_DASHBOARD_QUERY_KEYS } from '@/features/dashboard/queries/use-student-dashboard';
import { SUPER_ADMIN_QUERY_KEYS } from '@/features/super-admin/queries';
import { MENTOR_QUERY_KEYS } from '@/features/mentor/queries';
import { ADMIN_QUERY_KEYS } from '@/features/admin/queries';
import { PARENT_QUERY_KEYS } from '@/features/parent/queries/useParent';
import { StudentDashboardService } from '@/features/dashboard/services/student-dashboard.service';
import { SuperAdminService } from '@/features/super-admin/services/super-admin.service';
import { MentorService } from '@/features/mentor/services/mentor.service';
import { AdminService } from '@/features/admin/services/admin.service';
import { ParentService } from '@/features/parent/services/parent.service';

export const RoutePrefetcher = {
  // Prefetch Student Portal Queries
  async prefetchStudentDashboard(queryClient: QueryClient, studentId: string = 'student-123') {
    await queryClient.prefetchQuery({
      queryKey: STUDENT_DASHBOARD_QUERY_KEYS.all(studentId),
      queryFn: () => StudentDashboardService.getDashboard(studentId),
      staleTime: 1000 * 60 * 5,
    });
  },

  // Prefetch Parent Portal Queries
  async prefetchParentDashboard(queryClient: QueryClient, parentId: string = 'parent-123') {
    await queryClient.prefetchQuery({
      queryKey: PARENT_QUERY_KEYS.overview(parentId),
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

export {
  ApiError,
  getAuthToken,
  setAuthSession,
  clearAuthSession,
  authenticatedFetch,
  postJson,
} from '@/shared/api/axios';

export {
  useLoginMutation,
  useRegisterMutation,
  useVerifyOtpMutation,
} from '@/features/auth/queries/auth.queries';

export {
  useStudentOverview,
  useParentOverview,
  useMentorOverview,
  useCmsPage,
  useUpdateCmsSection,
} from '@/features/dashboard/queries/dashboard.queries';

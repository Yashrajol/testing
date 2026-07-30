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
  useRegisterSchoolMutation,
  useRegisterMentorMutation,
  useVerifyOtpMutation,
} from '@/features/auth/queries/auth.queries';

export {
  useStudentOverview,
  useParentOverview,
  useMentorOverview,
  useCmsPage,
  useUpdateCmsSection,
  useMe,
  useUpdateProfileMutation,
  useStudentGoals,
  useCreateGoalMutation,
  useUpdateGoalMutation,
  useDeleteGoalMutation,
  useAssessments,
  useAssessment,
  useSubmitAssessmentMutation,
} from '@/features/dashboard/queries/dashboard.queries';


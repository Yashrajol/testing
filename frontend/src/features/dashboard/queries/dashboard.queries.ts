import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authenticatedFetch } from '@/shared/api/axios';
import { API_ENDPOINTS } from '@/shared/api/endpoints';
import { QUERY_KEYS } from '@/shared/api/query-keys';
import { MUTATION_KEYS } from '@/shared/api/mutation-keys';

export function useStudentOverview(studentId = 'student-123') {
  return useQuery({
    queryKey: QUERY_KEYS.dashboard.student(studentId),
    queryFn: () => authenticatedFetch(API_ENDPOINTS.PORTALS.STUDENT_OVERVIEW(studentId)),
    retry: 1,
  });
}

export function useParentOverview(parentId = 'parent-123') {
  return useQuery({
    queryKey: QUERY_KEYS.dashboard.parent(parentId),
    queryFn: () => authenticatedFetch(API_ENDPOINTS.PORTALS.PARENT_OVERVIEW(parentId)),
    retry: 1,
  });
}

export function useMentorOverview(mentorId = 'mentor-123') {
  return useQuery({
    queryKey: QUERY_KEYS.dashboard.mentor(mentorId),
    queryFn: () => authenticatedFetch(API_ENDPOINTS.PORTALS.MENTOR_OVERVIEW(mentorId)),
    retry: 1,
  });
}

export function useCmsPage(slug: string) {
  return useQuery({
    queryKey: QUERY_KEYS.cms.page(slug),
    queryFn: () => authenticatedFetch(API_ENDPOINTS.CMS.PAGE(slug)),
  });
}

export function useUpdateCmsSection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: MUTATION_KEYS.cms.updateSection,
    mutationFn: ({ slug, sectionKey, content }: { slug: string; sectionKey: string; content: any }) =>
      authenticatedFetch(API_ENDPOINTS.CMS.SECTION(slug, sectionKey), {
        method: 'POST',
        body: JSON.stringify(content),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.cms.page(variables.slug) });
    },
  });
}

// ─────────────────────────────────────────────
// Auth / Me Profile Hooks
// ─────────────────────────────────────────────
export function useMe() {
  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: () => authenticatedFetch('/api/v1/auth/me'),
    retry: 1,
  });
}

export function useUpdateProfileMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) =>
      authenticatedFetch('/api/v1/auth/profile', {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
    },
  });
}

// ─────────────────────────────────────────────
// Growth Goals Hooks
// ─────────────────────────────────────────────
export function useStudentGoals(studentId?: string) {
  return useQuery({
    queryKey: ['growth', 'goals', studentId],
    queryFn: () => authenticatedFetch(studentId ? `/api/v1/growth/goals/${studentId}` : '/api/v1/growth/goals/me'),
    retry: 1,
  });
}

export function useCreateGoalMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (goalData: { title: string; description?: string; deadline?: string; category?: string }) =>
      authenticatedFetch('/api/v1/growth/goals', {
        method: 'POST',
        body: JSON.stringify(goalData),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['growth', 'goals'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}

export function useUpdateGoalMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: { id: string; title?: string; status?: string; progress?: number }) =>
      authenticatedFetch(`/api/v1/growth/goals/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['growth', 'goals'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}

export function useDeleteGoalMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      authenticatedFetch(`/api/v1/growth/goals/${id}`, {
        method: 'DELETE',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['growth', 'goals'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}

// ─────────────────────────────────────────────
// Assessments Hooks
// ─────────────────────────────────────────────
export function useAssessments() {
  return useQuery({
    queryKey: ['assessments', 'list'],
    queryFn: () => authenticatedFetch('/api/v1/assessments'),
    retry: 1,
  });
}

export function useAssessment(id: string) {
  return useQuery({
    queryKey: ['assessments', 'detail', id],
    queryFn: () => authenticatedFetch(`/api/v1/assessments/${id}`),
    enabled: !!id,
  });
}

export function useSubmitAssessmentMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ attemptId, answer }: { attemptId: string; answer: { questionId: string; selectedOptionId?: string; textAnswer?: string } }) =>
      authenticatedFetch(`/api/v1/attempts/${attemptId}/answer`, {
        method: 'POST',
        body: JSON.stringify(answer),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assessments'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}



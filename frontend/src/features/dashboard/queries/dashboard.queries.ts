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


import { useQuery } from '@tanstack/react-query';
import { AssignmentsService } from '../services/assignments.service';

export function useSubmissionStatus(id: string | null, studentId: string) {
  return useQuery({
    queryKey: ['assignments', id, 'submissions', studentId] as const,
    queryFn: () => AssignmentsService.getSubmissionStatus(id!, studentId),
    enabled: !!id && !!studentId,
  });
}

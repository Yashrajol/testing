import { useQuery } from '@tanstack/react-query';
import { AssignmentsService } from '../services/assignments.service';

export function useAssignments() {
  return useQuery({
    queryKey: ['assignments'] as const,
    queryFn: () => AssignmentsService.getAssignments(),
  });
}

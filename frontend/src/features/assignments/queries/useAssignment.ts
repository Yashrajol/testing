import { useQuery } from '@tanstack/react-query';
import { AssignmentsService } from '../services/assignments.service';

export function useAssignment(id: string | null) {
  return useQuery({
    queryKey: ['assignments', id] as const,
    queryFn: () => AssignmentsService.getAssignment(id!),
    enabled: !!id,
  });
}

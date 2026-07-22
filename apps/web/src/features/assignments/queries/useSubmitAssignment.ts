import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AssignmentsService } from '../services/assignments.service';

export function useSubmitAssignment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { assignmentId: string; studentId: string; fileKey: string; fileName: string }) =>
      AssignmentsService.submitAssignment(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['assignments'] });
      queryClient.invalidateQueries({ queryKey: ['assignments', variables.assignmentId, 'submissions', variables.studentId] });
    },
  });
}

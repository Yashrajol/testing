import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AssignmentsService } from '../services/assignments.service';
import { DraftSubmission } from '../types';

export function useSaveDraft() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DraftSubmission) =>
      AssignmentsService.saveDraft(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['assignments', variables.assignmentId, 'submissions', variables.studentId] });
    },
  });
}

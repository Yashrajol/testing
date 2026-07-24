import { useQuery } from '@tanstack/react-query';
import { SessionsService } from '../services/sessions.service';

export function useSessions(studentId: string) {
  return useQuery({
    queryKey: ['sessions', studentId] as const,
    queryFn: () => SessionsService.getStudentSessions(studentId),
    enabled: !!studentId,
  });
}

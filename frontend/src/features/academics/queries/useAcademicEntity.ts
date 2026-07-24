import { useQuery } from '@tanstack/react-query';
import { AcademicsService } from '../services/academics.service';

export function useAcademicEntity(id: string | null) {
  return useQuery({
    queryKey: ['academics', 'entities', id] as const,
    queryFn: () => AcademicsService.getSubject(id!),
    enabled: !!id,
  });
}

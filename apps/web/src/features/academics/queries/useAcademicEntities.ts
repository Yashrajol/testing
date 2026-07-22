import { useQuery } from '@tanstack/react-query';
import { AcademicsService } from '../services/academics.service';

export function useAcademicEntities() {
  return useQuery({
    queryKey: ['academics', 'entities'] as const,
    queryFn: () => AcademicsService.getSubjects(),
  });
}

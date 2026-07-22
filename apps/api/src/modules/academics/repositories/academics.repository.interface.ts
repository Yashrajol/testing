import { AcademicEntityType } from '../constants/academics.constants';
import { AcademicFilterOptions } from '../types/academics.types';

export interface IAcademicsRepository {
  findById(entityType: AcademicEntityType, id: string): Promise<any | null>;
  create(entityType: AcademicEntityType, data: any): Promise<any>;
  update(entityType: AcademicEntityType, id: string, data: any): Promise<any>;
  softDelete(entityType: AcademicEntityType, id: string): Promise<void>;
  findMany(options: AcademicFilterOptions): Promise<{ items: any[]; total: number }>;
}

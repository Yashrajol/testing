import { LearningEntityType } from '../constants/learning.constants';
import { LearningFilterOptions } from '../types/learning.types';

export interface ILearningRepository {
  findById(entityType: LearningEntityType, id: string): Promise<any | null>;
  create(entityType: LearningEntityType, data: any): Promise<any>;
  update(entityType: LearningEntityType, id: string, data: any): Promise<any>;
  softDelete(entityType: LearningEntityType, id: string): Promise<void>;
  findMany(options: LearningFilterOptions): Promise<{ items: any[]; total: number }>;
}

import { LearningFilterOptions } from '../../types/learning.types';

export class ListLearningEntitiesQuery {
  constructor(public readonly options: LearningFilterOptions) {}
}

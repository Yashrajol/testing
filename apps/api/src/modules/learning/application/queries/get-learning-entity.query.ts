import { LearningEntityType } from '../../constants/learning.constants';

export class GetLearningEntityQuery {
  constructor(
    public readonly entityType: LearningEntityType,
    public readonly id: string,
  ) {}
}

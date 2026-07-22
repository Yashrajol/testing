import { LearningEntityType } from '../../constants/learning.constants';

export class UpdateLearningEntityCommand {
  constructor(
    public readonly entityType: LearningEntityType,
    public readonly id: string,
    public readonly updates: any,
  ) {}
}

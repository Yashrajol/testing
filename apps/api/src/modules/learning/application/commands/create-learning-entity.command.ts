import { LearningEntityType } from '../../constants/learning.constants';

export class CreateLearningEntityCommand {
  constructor(
    public readonly entityType: LearningEntityType,
    public readonly payload: any,
  ) {}
}

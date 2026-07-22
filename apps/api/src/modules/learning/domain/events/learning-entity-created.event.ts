import { LearningEntityType } from '../../constants/learning.constants';

export class LearningEntityCreatedEvent {
  constructor(
    public readonly entityId: string,
    public readonly entityType: LearningEntityType,
    public readonly title: string,
    public readonly timestamp: Date = new Date(),
  ) {}
}

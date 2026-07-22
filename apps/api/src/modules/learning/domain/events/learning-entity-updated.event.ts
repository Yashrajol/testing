import { LearningEntityType } from '../../constants/learning.constants';

export class LearningEntityUpdatedEvent {
  constructor(
    public readonly entityId: string,
    public readonly entityType: LearningEntityType,
    public readonly updatedFields: string[],
    public readonly timestamp: Date = new Date(),
  ) {}
}

import { LearningEntityType } from '../../constants/learning.constants';

export class LearningEntityArchivedEvent {
  constructor(
    public readonly entityId: string,
    public readonly entityType: LearningEntityType,
    public readonly archivedBy: string,
    public readonly timestamp: Date = new Date(),
  ) {}
}

import { LearningEntityType } from '../../constants/learning.constants';

export class ArchiveLearningEntityCommand {
  constructor(
    public readonly entityType: LearningEntityType,
    public readonly id: string,
    public readonly archivedBy: string,
  ) {}
}

import { Injectable, Inject } from '@nestjs/common';
import { LEARNING_REPOSITORY_TOKEN } from '../../constants/learning.constants';
import { ILearningRepository } from '../../repositories/learning.repository.interface';
import { ArchiveLearningEntityCommand } from '../commands/archive-learning-entity.command';
import { LearningNotFoundException } from '../../domain/exceptions/learning-not-found.exception';
import { LearningEntityArchivedEvent } from '../../domain/events/learning-entity-archived.event';

@Injectable()
export class ArchiveLearningEntityHandler {
  constructor(
    @Inject(LEARNING_REPOSITORY_TOKEN)
    private readonly repo: ILearningRepository,
  ) {}

  async execute(command: ArchiveLearningEntityCommand): Promise<{ event: LearningEntityArchivedEvent }> {
    const existing = await this.repo.findById(command.entityType, command.id);
    if (!existing) {
      throw new LearningNotFoundException(command.entityType, command.id);
    }

    await this.repo.softDelete(command.entityType, command.id);
    const event = new LearningEntityArchivedEvent(command.id, command.entityType, command.archivedBy);

    return { event };
  }
}

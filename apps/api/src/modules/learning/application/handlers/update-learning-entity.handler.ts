import { Injectable, Inject } from '@nestjs/common';
import { LEARNING_REPOSITORY_TOKEN } from '../../constants/learning.constants';
import { ILearningRepository } from '../../repositories/learning.repository.interface';
import { UpdateLearningEntityCommand } from '../commands/update-learning-entity.command';
import { LearningEntityResponseDto } from '../dtos/learning-response.dto';
import { LearningMapper } from '../mappers/learning.mapper';
import { LearningNotFoundException } from '../../domain/exceptions/learning-not-found.exception';
import { LearningEntityUpdatedEvent } from '../../domain/events/learning-entity-updated.event';

@Injectable()
export class UpdateLearningEntityHandler {
  constructor(
    @Inject(LEARNING_REPOSITORY_TOKEN)
    private readonly repo: ILearningRepository,
  ) {}

  async execute(command: UpdateLearningEntityCommand): Promise<{ result: LearningEntityResponseDto; event: LearningEntityUpdatedEvent }> {
    const existing = await this.repo.findById(command.entityType, command.id);
    if (!existing) {
      throw new LearningNotFoundException(command.entityType, command.id);
    }

    const updated = await this.repo.update(command.entityType, command.id, command.updates);
    const event = new LearningEntityUpdatedEvent(command.id, command.entityType, Object.keys(command.updates));

    return {
      result: LearningMapper.toResponseDto(command.entityType, updated),
      event,
    };
  }
}

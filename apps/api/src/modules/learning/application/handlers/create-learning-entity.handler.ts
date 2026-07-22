import { Injectable, Inject } from '@nestjs/common';
import { LEARNING_REPOSITORY_TOKEN } from '../../constants/learning.constants';
import { ILearningRepository } from '../../repositories/learning.repository.interface';
import { CreateLearningEntityCommand } from '../commands/create-learning-entity.command';
import { LearningEntityResponseDto } from '../dtos/learning-response.dto';
import { LearningMapper } from '../mappers/learning.mapper';
import { LearningEntityCreatedEvent } from '../../domain/events/learning-entity-created.event';

@Injectable()
export class CreateLearningEntityHandler {
  constructor(
    @Inject(LEARNING_REPOSITORY_TOKEN)
    private readonly repo: ILearningRepository,
  ) {}

  async execute(command: CreateLearningEntityCommand): Promise<{ result: LearningEntityResponseDto; event: LearningEntityCreatedEvent }> {
    const entity = await this.repo.create(command.entityType, command.payload);
    const event = new LearningEntityCreatedEvent(entity.id, command.entityType, entity.title || `LearningEntity-${entity.id}`);

    return {
      result: LearningMapper.toResponseDto(command.entityType, entity),
      event,
    };
  }
}

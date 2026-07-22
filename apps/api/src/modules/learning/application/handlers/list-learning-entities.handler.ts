import { Injectable, Inject } from '@nestjs/common';
import { LEARNING_REPOSITORY_TOKEN } from '../../constants/learning.constants';
import { ILearningRepository } from '../../repositories/learning.repository.interface';
import { ListLearningEntitiesQuery } from '../queries/list-learning-entities.query';
import { LearningEntityResponseDto } from '../dtos/learning-response.dto';
import { LearningMapper } from '../mappers/learning.mapper';

@Injectable()
export class ListLearningEntitiesHandler {
  constructor(
    @Inject(LEARNING_REPOSITORY_TOKEN)
    private readonly repo: ILearningRepository,
  ) {}

  async execute(query: ListLearningEntitiesQuery): Promise<{ items: LearningEntityResponseDto[]; total: number }> {
    const { items, total } = await this.repo.findMany(query.options);
    return {
      items: items.map((entity) => LearningMapper.toResponseDto(query.options.entityType, entity)),
      total,
    };
  }
}

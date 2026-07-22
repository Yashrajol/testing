import { Injectable, Inject } from '@nestjs/common';
import { LEARNING_REPOSITORY_TOKEN } from '../../constants/learning.constants';
import { ILearningRepository } from '../../repositories/learning.repository.interface';
import { GetLearningEntityQuery } from '../queries/get-learning-entity.query';
import { LearningEntityResponseDto } from '../dtos/learning-response.dto';
import { LearningMapper } from '../mappers/learning.mapper';
import { LearningNotFoundException } from '../../domain/exceptions/learning-not-found.exception';

@Injectable()
export class GetLearningEntityHandler {
  constructor(
    @Inject(LEARNING_REPOSITORY_TOKEN)
    private readonly repo: ILearningRepository,
  ) {}

  async execute(query: GetLearningEntityQuery): Promise<LearningEntityResponseDto> {
    const entity = await this.repo.findById(query.entityType, query.id);
    if (!entity) {
      throw new LearningNotFoundException(query.entityType, query.id);
    }
    return LearningMapper.toResponseDto(query.entityType, entity);
  }
}

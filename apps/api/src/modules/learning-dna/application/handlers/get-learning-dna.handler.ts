import { Injectable, Inject } from '@nestjs/common';
import { LEARNING_DNA_REPOSITORY_TOKEN } from '../../constants/learning-dna.constants';
import { ILearningDnaRepository } from '../../repositories/learning-dna.repository.interface';
import { GetLearningDnaQuery } from '../queries/get-learning-dna.query';
import { LearningDnaResponseDto } from '../dtos/learning-dna-response.dto';
import { LearningDnaMapper } from '../mappers/learning-dna.mapper';
import { LearningDnaNotFoundException } from '../../domain/exceptions/learning-dna-not-found.exception';

@Injectable()
export class GetLearningDnaHandler {
  constructor(
    @Inject(LEARNING_DNA_REPOSITORY_TOKEN)
    private readonly repo: ILearningDnaRepository,
  ) {}

  async execute(query: GetLearningDnaQuery): Promise<LearningDnaResponseDto> {
    const dna = await this.repo.findDnaByStudentId(query.studentId);
    if (!dna) {
      throw new LearningDnaNotFoundException(query.studentId);
    }
    return LearningDnaMapper.toDnaDto(dna);
  }
}

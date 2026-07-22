import { Injectable, Inject } from '@nestjs/common';
import { LEARNING_DNA_REPOSITORY_TOKEN } from '../../constants/learning-dna.constants';
import { ILearningDnaRepository } from '../../repositories/learning-dna.repository.interface';
import { GetAdaptivePathQuery } from '../queries/get-adaptive-path.query';
import { AdaptivePathNodeResponseDto } from '../dtos/learning-dna-response.dto';
import { LearningDnaMapper } from '../mappers/learning-dna.mapper';

@Injectable()
export class GetAdaptivePathHandler {
  constructor(
    @Inject(LEARNING_DNA_REPOSITORY_TOKEN)
    private readonly repo: ILearningDnaRepository,
  ) {}

  async execute(query: GetAdaptivePathQuery): Promise<AdaptivePathNodeResponseDto[]> {
    const nodes = await this.repo.findAdaptivePath(query.studentId);
    return nodes.map((n) => LearningDnaMapper.toNodeDto(n));
  }
}

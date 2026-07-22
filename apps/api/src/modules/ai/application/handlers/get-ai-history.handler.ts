import { Injectable, Inject } from '@nestjs/common';
import { AI_REPOSITORY_TOKEN } from '../../constants/ai.constants';
import { IAIRepository } from '../../repositories/ai.repository.interface';
import { GetAIHistoryQuery } from '../queries/get-ai-history.query';
import { AIRequestResponseDto } from '../dtos/ai-response-dto';
import { AIMapper } from '../mappers/ai.mapper';

@Injectable()
export class GetAIHistoryHandler {
  constructor(
    @Inject(AI_REPOSITORY_TOKEN)
    private readonly repo: IAIRepository,
  ) {}

  async execute(query: GetAIHistoryQuery): Promise<AIRequestResponseDto[]> {
    const requests = await this.repo.findRequests(query.options);
    return requests.map((r) => AIMapper.toRequestDto(r));
  }
}

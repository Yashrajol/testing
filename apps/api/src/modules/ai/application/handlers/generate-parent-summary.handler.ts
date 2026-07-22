import { Injectable, Inject } from '@nestjs/common';
import { AI_REPOSITORY_TOKEN, PromptType } from '../../constants/ai.constants';
import { IAIRepository } from '../../repositories/ai.repository.interface';
import { GenerateParentSummaryCommand } from '../commands/generate-parent-summary.command';
import { AIRecommendationResponseDto } from '../dtos/ai-response-dto';
import { AIMapper } from '../mappers/ai.mapper';
import { AIGatewayService } from '../services/ai-gateway.service';

@Injectable()
export class GenerateParentSummaryHandler {
  constructor(
    @Inject(AI_REPOSITORY_TOKEN)
    private readonly repo: IAIRepository,
    private readonly aiGateway: AIGatewayService,
  ) {}

  async execute(command: GenerateParentSummaryCommand): Promise<AIRecommendationResponseDto> {
    const aiResponse = await this.aiGateway.executePrompt(PromptType.PARENT_SUMMARY, {
      studentId: command.dto.studentId,
    });

    const rec = await this.repo.createRecommendation({
      targetId: command.dto.studentId,
      targetType: 'PARENT',
      title: 'Weekly Learning Focus Summary',
      content: aiResponse.content,
      contextData: { source: 'AI_PLATFORM_PARENT_PORTAL' },
    });

    return AIMapper.toRecommendationDto(rec);
  }
}

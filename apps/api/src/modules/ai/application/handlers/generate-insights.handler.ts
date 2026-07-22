import { Injectable, Inject } from '@nestjs/common';
import { AI_REPOSITORY_TOKEN, PromptType } from '../../constants/ai.constants';
import { IAIRepository } from '../../repositories/ai.repository.interface';
import { GenerateInsightsCommand } from '../commands/generate-insights.command';
import { LearningInsightResponseDto } from '../dtos/ai-response-dto';
import { AIMapper } from '../mappers/ai.mapper';
import { AIGatewayService } from '../services/ai-gateway.service';

@Injectable()
export class GenerateInsightsHandler {
  constructor(
    @Inject(AI_REPOSITORY_TOKEN)
    private readonly repo: IAIRepository,
    private readonly aiGateway: AIGatewayService,
  ) {}

  async execute(command: GenerateInsightsCommand): Promise<LearningInsightResponseDto> {
    const aiResponse = await this.aiGateway.executePrompt(PromptType.LEARNING_INSIGHTS, {
      studentId: command.dto.studentId,
    });

    const insight = await this.repo.createInsight({
      studentId: command.dto.studentId,
      focusScore: 84.5,
      retentionRate: 91.2,
      velocityIndex: 1.18,
      insights: {
        analysis: aiResponse.content,
        strongestChannel: 'Visual Learning',
        improvementVelocity: 'UPWARD_TREND',
      },
    });

    return AIMapper.toLearningInsightDto(insight);
  }
}

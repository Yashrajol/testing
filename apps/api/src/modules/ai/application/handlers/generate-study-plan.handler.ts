import { Injectable, Inject } from '@nestjs/common';
import { AI_REPOSITORY_TOKEN, PromptType } from '../../constants/ai.constants';
import { IAIRepository } from '../../repositories/ai.repository.interface';
import { GenerateStudyPlanCommand } from '../commands/generate-study-plan.command';
import { StudyPlanResponseDto } from '../dtos/ai-response-dto';
import { AIMapper } from '../mappers/ai.mapper';
import { AIGatewayService } from '../services/ai-gateway.service';

@Injectable()
export class GenerateStudyPlanHandler {
  constructor(
    @Inject(AI_REPOSITORY_TOKEN)
    private readonly repo: IAIRepository,
    private readonly aiGateway: AIGatewayService,
  ) {}

  async execute(command: GenerateStudyPlanCommand): Promise<StudyPlanResponseDto> {
    const aiResponse = await this.aiGateway.executePrompt(PromptType.STUDY_PLAN, {
      studentId: command.dto.studentId,
      focusSubject: command.dto.focusSubject,
    });

    const plan = await this.repo.createStudyPlan({
      studentId: command.dto.studentId,
      title: `AI Study Plan: ${command.dto.focusSubject || 'Overall Growth'}`,
      planData: {
        rawResponse: aiResponse.content,
        generatedAt: new Date(),
        recommendations: [
          'Solve daily practice sets on core variables',
          'Spend 20 mins reviewing weak topic summaries',
        ],
      },
    });

    return AIMapper.toStudyPlanDto(plan);
  }
}

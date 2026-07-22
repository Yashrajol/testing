import { Injectable, Inject } from '@nestjs/common';
import { AI_REPOSITORY_TOKEN, PromptType } from '../../constants/ai.constants';
import { IAIRepository } from '../../repositories/ai.repository.interface';
import { GenerateRiskAnalysisCommand } from '../commands/generate-risk-analysis.command';
import { RiskAnalysisResponseDto } from '../dtos/ai-response-dto';
import { AIMapper } from '../mappers/ai.mapper';
import { AIGatewayService } from '../services/ai-gateway.service';

@Injectable()
export class GenerateRiskAnalysisHandler {
  constructor(
    @Inject(AI_REPOSITORY_TOKEN)
    private readonly repo: IAIRepository,
    private readonly aiGateway: AIGatewayService,
  ) {}

  async execute(command: GenerateRiskAnalysisCommand): Promise<RiskAnalysisResponseDto> {
    const aiResponse = await this.aiGateway.executePrompt(PromptType.RISK_ANALYSIS, {
      studentId: command.dto.studentId,
    });

    const analysis = await this.repo.createRiskAnalysis({
      studentId: command.dto.studentId,
      riskLevel: 'MEDIUM',
      summary: aiResponse.content,
      riskFactors: ['Assignment completion rate dropped below 70%', 'Low quiz test marks'],
      interventions: ['Assign targeted revision plan', 'Flag to parent dashboard'],
    });

    return AIMapper.toRiskAnalysisDto(analysis);
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { AI_REPOSITORY_TOKEN, PromptType } from '../../constants/ai.constants';
import { IAIRepository } from '../../repositories/ai.repository.interface';
import { GenerateCareerAdviceCommand } from '../commands/generate-career-advice.command';
import { CareerAdviceResponseDto } from '../dtos/ai-response-dto';
import { AIMapper } from '../mappers/ai.mapper';
import { AIGatewayService } from '../services/ai-gateway.service';

@Injectable()
export class GenerateCareerAdviceHandler {
  constructor(
    @Inject(AI_REPOSITORY_TOKEN)
    private readonly repo: IAIRepository,
    private readonly aiGateway: AIGatewayService,
  ) {}

  async execute(command: GenerateCareerAdviceCommand): Promise<CareerAdviceResponseDto> {
    const aiResponse = await this.aiGateway.executePrompt(PromptType.CAREER_ADVICE, {
      studentId: command.dto.studentId,
    });

    const advice = await this.repo.createCareerAdvice({
      studentId: command.dto.studentId,
      industry: 'Software Engineering & Cloud Architecture',
      recommendedRoles: ['Full-stack Developer', 'Cloud Infrastructure Engineer'],
      skillGaps: ['Docker / Containerization', 'Kubernetes Orchestration'],
      adviceText: aiResponse.content,
    });

    return AIMapper.toCareerAdviceDto(advice);
  }
}

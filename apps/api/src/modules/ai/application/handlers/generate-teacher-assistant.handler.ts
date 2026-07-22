import { Injectable } from '@nestjs/common';
import { PromptType } from '../../constants/ai.constants';
import { GenerateTeacherAssistantCommand } from '../commands/generate-teacher-assistant.command';
import { AIGatewayService } from '../services/ai-gateway.service';

@Injectable()
export class GenerateTeacherAssistantHandler {
  constructor(private readonly aiGateway: AIGatewayService) {}

  async execute(command: GenerateTeacherAssistantCommand): Promise<{ suggestion: string }> {
    const aiResponse = await this.aiGateway.executePrompt(PromptType.TEACHER_ASSISTANT, {
      promptInstruction: command.dto.promptInstruction,
      studentId: 'ALL',
    }, {
      userId: command.dto.teacherId,
    });

    return {
      suggestion: aiResponse.content,
    };
  }
}

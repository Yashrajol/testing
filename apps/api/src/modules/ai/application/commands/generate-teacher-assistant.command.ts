import { TeacherAssistantDto } from '../dtos/generate-ai.dto';

export class GenerateTeacherAssistantCommand {
  constructor(public readonly dto: TeacherAssistantDto) {}
}

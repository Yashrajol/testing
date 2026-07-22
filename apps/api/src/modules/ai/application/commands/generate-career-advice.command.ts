import { GenerateCareerAdviceDto } from '../dtos/generate-ai.dto';

export class GenerateCareerAdviceCommand {
  constructor(public readonly dto: GenerateCareerAdviceDto) {}
}

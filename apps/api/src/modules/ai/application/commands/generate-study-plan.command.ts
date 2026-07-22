import { GenerateStudyPlanDto } from '../dtos/generate-ai.dto';

export class GenerateStudyPlanCommand {
  constructor(public readonly dto: GenerateStudyPlanDto) {}
}

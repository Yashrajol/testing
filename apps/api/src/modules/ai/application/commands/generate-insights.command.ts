import { GenerateInsightsDto } from '../dtos/generate-ai.dto';

export class GenerateInsightsCommand {
  constructor(public readonly dto: GenerateInsightsDto) {}
}

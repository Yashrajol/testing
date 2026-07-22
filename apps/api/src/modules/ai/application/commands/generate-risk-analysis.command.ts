import { RiskAnalysisDto } from '../dtos/generate-ai.dto';

export class GenerateRiskAnalysisCommand {
  constructor(public readonly dto: RiskAnalysisDto) {}
}

import { ParentSummaryDto } from '../dtos/generate-ai.dto';

export class GenerateParentSummaryCommand {
  constructor(public readonly dto: ParentSummaryDto) {}
}

import { CreateAssessmentDto } from '../dtos/assessment-request.dto';

export class CreateAssessmentCommand {
  constructor(public readonly dto: CreateAssessmentDto) {}
}

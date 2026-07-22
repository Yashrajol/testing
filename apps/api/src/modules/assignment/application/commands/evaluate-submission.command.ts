import { EvaluateSubmissionDto } from '../dtos/assignment-request.dto';

export class EvaluateSubmissionCommand {
  constructor(
    public readonly submissionId: string,
    public readonly dto: EvaluateSubmissionDto,
    public readonly evaluatorId?: string,
  ) {}
}

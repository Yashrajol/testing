import { EvaluateAttemptDto } from '../dtos/assessment-request.dto';

export class EvaluateAttemptCommand {
  constructor(
    public readonly attemptId: string,
    public readonly dto: EvaluateAttemptDto,
    public readonly evaluatorId?: string,
  ) {}
}

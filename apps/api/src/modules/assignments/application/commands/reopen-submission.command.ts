import { ReopenSubmissionDto } from '../dtos/evaluation-dto';

export class ReopenSubmissionCommand {
  constructor(
    public readonly submissionId: string,
    public readonly reopenedById: string,
    public readonly dto?: ReopenSubmissionDto,
  ) {}
}

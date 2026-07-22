import { ReturnSubmissionDto } from '../dtos/evaluation-dto';

export class ReturnSubmissionCommand {
  constructor(
    public readonly submissionId: string,
    public readonly returnedById: string,
    public readonly dto?: ReturnSubmissionDto,
  ) {}
}

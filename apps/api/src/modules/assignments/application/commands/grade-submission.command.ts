import { GradeSubmissionDto } from '../dtos/evaluation-dto';

export class GradeSubmissionCommand {
  constructor(
    public readonly submissionId: string,
    public readonly dto: GradeSubmissionDto,
    public readonly gradedById: string,
  ) {}
}

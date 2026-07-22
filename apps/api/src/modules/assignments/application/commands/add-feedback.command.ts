import { AddFeedbackDto } from '../dtos/evaluation-dto';

export class AddFeedbackCommand {
  constructor(
    public readonly submissionId: string,
    public readonly dto: AddFeedbackDto,
    public readonly authorId: string,
  ) {}
}

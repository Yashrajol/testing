import { SubmitAnswerDto } from '../dtos/assessment-request.dto';

export class SubmitAnswerCommand {
  constructor(
    public readonly attemptId: string,
    public readonly dto: SubmitAnswerDto,
  ) {}
}

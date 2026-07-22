import { SubmitAssignmentDto } from '../dtos/submission-request.dto';

export class SubmitAssignmentCommand {
  constructor(public readonly dto: SubmitAssignmentDto) {}
}

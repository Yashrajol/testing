import { SubmitAssignmentDto } from '../dtos/assignment-request.dto';

export class SubmitAssignmentCommand {
  constructor(public readonly dto: SubmitAssignmentDto) {}
}

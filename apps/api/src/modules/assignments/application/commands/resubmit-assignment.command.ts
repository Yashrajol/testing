import { ResubmitAssignmentDto } from '../dtos/submission-request.dto';

export class ResubmitAssignmentCommand {
  constructor(public readonly dto: ResubmitAssignmentDto) {}
}

import { UpdateAssignmentDto } from '../dtos/assignment-request.dto';

export class UpdateAssignmentCommand {
  constructor(public readonly id: string, public readonly dto: UpdateAssignmentDto) {}
}

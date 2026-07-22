import { CloneAssignmentDto } from '../dtos/assignment-request.dto';

export class CloneAssignmentCommand {
  constructor(public readonly id: string, public readonly dto: CloneAssignmentDto, public readonly createdById?: string) {}
}

import { CreateAssignmentDto } from '../dtos/assignment-request.dto';

export class CreateAssignmentCommand {
  constructor(public readonly dto: CreateAssignmentDto, public readonly createdById?: string) {}
}

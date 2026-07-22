import { Injectable, Inject } from '@nestjs/common';
import { ASSIGNMENT_REPOSITORY_TOKEN } from '../../constants/assignments.constants';
import { IAssignmentRepository } from '../../repositories/assignment.repository.interface';
import { DeleteAssignmentCommand } from '../commands/delete-assignment.command';

@Injectable()
export class DeleteAssignmentHandler {
  constructor(
    @Inject(ASSIGNMENT_REPOSITORY_TOKEN)
    private readonly repo: IAssignmentRepository,
  ) {}

  async execute(command: DeleteAssignmentCommand): Promise<{ success: boolean; id: string }> {
    await this.repo.deleteAssignment(command.id);
    return { success: true, id: command.id };
  }
}

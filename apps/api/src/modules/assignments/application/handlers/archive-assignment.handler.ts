import { Injectable, Inject } from '@nestjs/common';
import { ASSIGNMENT_REPOSITORY_TOKEN, AssignmentStatus } from '../../constants/assignments.constants';
import { IAssignmentRepository } from '../../repositories/assignment.repository.interface';
import { ArchiveAssignmentCommand } from '../commands/archive-assignment.command';
import { AssignmentResponseDto } from '../dtos/assignment-response.dto';
import { AssignmentMapper } from '../mappers/assignment.mapper';

@Injectable()
export class ArchiveAssignmentHandler {
  constructor(
    @Inject(ASSIGNMENT_REPOSITORY_TOKEN)
    private readonly repo: IAssignmentRepository,
  ) {}

  async execute(command: ArchiveAssignmentCommand): Promise<AssignmentResponseDto> {
    const updated = await this.repo.updateAssignment(command.id, {
      status: AssignmentStatus.ARCHIVED,
      archivedAt: new Date(),
    });
    return AssignmentMapper.toAssignmentDto(updated);
  }
}

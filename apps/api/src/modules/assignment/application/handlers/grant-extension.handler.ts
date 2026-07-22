import { Injectable, Inject } from '@nestjs/common';
import { ASSIGNMENT_REPOSITORY_TOKEN } from '../../constants/assignment.constants';
import { IAssignmentRepository } from '../../repositories/assignment.repository.interface';
import { GrantExtensionCommand } from '../commands/grant-extension.command';
import { ExtensionResponseDto } from '../dtos/assignment-response.dto';
import { AssignmentMapper } from '../mappers/assignment.mapper';

@Injectable()
export class GrantExtensionHandler {
  constructor(
    @Inject(ASSIGNMENT_REPOSITORY_TOKEN)
    private readonly repo: IAssignmentRepository,
  ) {}

  async execute(command: GrantExtensionCommand): Promise<ExtensionResponseDto> {
    const created = await this.repo.grantExtension({
      assignmentId: command.dto.assignmentId,
      studentId: command.dto.studentId,
      extendedDueDate: new Date(command.dto.extendedDueDate),
      reason: command.dto.reason,
      grantedBy: command.grantedBy,
    });

    return AssignmentMapper.toExtensionDto(created);
  }
}

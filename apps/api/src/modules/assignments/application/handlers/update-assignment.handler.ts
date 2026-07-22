import { Injectable, Inject } from '@nestjs/common';
import { ASSIGNMENT_REPOSITORY_TOKEN } from '../../constants/assignments.constants';
import { IAssignmentRepository } from '../../repositories/assignment.repository.interface';
import { UpdateAssignmentCommand } from '../commands/update-assignment.command';
import { AssignmentResponseDto } from '../dtos/assignment-response.dto';
import { AssignmentMapper } from '../mappers/assignment.mapper';
import { AssignmentNotFoundException } from '../../domain/exceptions/assignment-exceptions';

@Injectable()
export class UpdateAssignmentHandler {
  constructor(
    @Inject(ASSIGNMENT_REPOSITORY_TOKEN)
    private readonly repo: IAssignmentRepository,
  ) {}

  async execute(command: UpdateAssignmentCommand): Promise<AssignmentResponseDto> {
    const existing = await this.repo.findAssignmentById(command.id);
    if (!existing) {
      throw new AssignmentNotFoundException(command.id);
    }

    const updated = await this.repo.updateAssignment(command.id, {
      title: command.dto.title,
      description: command.dto.description,
      category: command.dto.category,
      status: command.dto.status,
      totalPoints: command.dto.totalPoints,
      dueDate: command.dto.dueDate ? new Date(command.dto.dueDate) : undefined,
    });

    return AssignmentMapper.toAssignmentDto(updated);
  }
}

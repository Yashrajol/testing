import { Injectable, Inject } from '@nestjs/common';
import { ASSIGNMENT_REPOSITORY_TOKEN, AssignmentStatus } from '../../constants/assignment.constants';
import { IAssignmentRepository } from '../../repositories/assignment.repository.interface';
import { CreateAssignmentCommand } from '../commands/create-assignment.command';
import { AssignmentResponseDto } from '../dtos/assignment-response.dto';
import { AssignmentMapper } from '../mappers/assignment.mapper';

@Injectable()
export class CreateAssignmentHandler {
  constructor(
    @Inject(ASSIGNMENT_REPOSITORY_TOKEN)
    private readonly repo: IAssignmentRepository,
  ) {}

  async execute(command: CreateAssignmentCommand): Promise<AssignmentResponseDto> {
    const created = await this.repo.createAssignment({
      batchId: command.dto.batchId,
      title: command.dto.title,
      description: command.dto.description,
      totalPoints: command.dto.totalPoints,
      dueDate: new Date(command.dto.dueDate),
      allowLate: command.dto.allowLate ?? true,
      allowResubmit: command.dto.allowResubmit ?? true,
      maxSubmissions: command.dto.maxSubmissions ?? 3,
      status: AssignmentStatus.DRAFT,
      rubrics: command.dto.rubrics
        ? {
            create: command.dto.rubrics.map((r) => ({
              criteriaName: r.criteriaName,
              maxPoints: r.maxPoints,
              description: r.description,
            })),
          }
        : undefined,
    });

    return AssignmentMapper.toAssignmentDto(created);
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { ASSIGNMENT_REPOSITORY_TOKEN, AssignmentStatus } from '../../constants/assignments.constants';
import { IAssignmentRepository } from '../../repositories/assignment.repository.interface';
import { CloneAssignmentCommand } from '../commands/clone-assignment.command';
import { AssignmentResponseDto } from '../dtos/assignment-response.dto';
import { AssignmentMapper } from '../mappers/assignment.mapper';
import { AssignmentNotFoundException } from '../../domain/exceptions/assignment-exceptions';

@Injectable()
export class CloneAssignmentHandler {
  constructor(
    @Inject(ASSIGNMENT_REPOSITORY_TOKEN)
    private readonly repo: IAssignmentRepository,
  ) {}

  async execute(command: CloneAssignmentCommand): Promise<AssignmentResponseDto> {
    const existing = await this.repo.findAssignmentById(command.id);
    if (!existing) {
      throw new AssignmentNotFoundException(command.id);
    }

    const cloned = await this.repo.createAssignment({
      organizationId: existing.organizationId,
      tenantId: existing.tenantId,
      title: `${existing.title} (Clone)`,
      description: existing.description,
      category: existing.category,
      batchId: command.dto.targetBatchId,
      classId: existing.classId,
      subjectId: existing.subjectId,
      teacherId: existing.teacherId,
      totalPoints: existing.totalPoints,
      passingPoints: existing.passingPoints,
      gradingType: existing.gradingType,
      isGroupAssignment: existing.isGroupAssignment,
      maxGroupSize: existing.maxGroupSize,
      allowLateSubmission: existing.allowLateSubmission,
      latePenaltyPercentPerDay: existing.latePenaltyPercentPerDay,
      maxSubmissions: existing.maxSubmissions,
      dueDate: command.dto.newDueDate ? new Date(command.dto.newDueDate) : existing.dueDate,
      gitRepoUrl: existing.gitRepoUrl,
      createdById: command.createdById,
      status: AssignmentStatus.DRAFT,
    });

    return AssignmentMapper.toAssignmentDto(cloned);
  }
}

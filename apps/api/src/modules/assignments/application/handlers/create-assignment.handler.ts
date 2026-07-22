import { Injectable, Inject } from '@nestjs/common';
import { ASSIGNMENT_REPOSITORY_TOKEN, AssignmentStatus } from '../../constants/assignments.constants';
import { IAssignmentRepository } from '../../repositories/assignment.repository.interface';
import { CreateAssignmentCommand } from '../commands/create-assignment.command';
import { AssignmentResponseDto } from '../dtos/assignment-response.dto';
import { AssignmentMapper } from '../mappers/assignment.mapper';
import { AssignmentCreatedEvent } from '../../domain/events/assignment-created.event';
import { AssignmentIntegrationService } from '../services/assignment-integration.service';

@Injectable()
export class CreateAssignmentHandler {
  constructor(
    @Inject(ASSIGNMENT_REPOSITORY_TOKEN)
    private readonly repo: IAssignmentRepository,
    private readonly integrationService: AssignmentIntegrationService,
  ) {}

  async execute(command: CreateAssignmentCommand): Promise<AssignmentResponseDto> {
    const dueDate = new Date(command.dto.dueDate);
    const assignment = await this.repo.createAssignment({
      organizationId: command.dto.organizationId,
      tenantId: command.dto.tenantId,
      title: command.dto.title,
      description: command.dto.description,
      category: command.dto.category,
      batchId: command.dto.batchId,
      classId: command.dto.classId,
      subjectId: command.dto.subjectId,
      teacherId: command.dto.teacherId,
      totalPoints: command.dto.totalPoints,
      passingPoints: command.dto.passingPoints,
      gradingType: command.dto.gradingType,
      isGroupAssignment: command.dto.isGroupAssignment,
      maxGroupSize: command.dto.maxGroupSize,
      allowLateSubmission: command.dto.allowLateSubmission,
      latePenaltyPercentPerDay: command.dto.latePenaltyPercentPerDay,
      maxSubmissions: command.dto.maxSubmissions || 3,
      dueDate,
      gitRepoUrl: command.dto.gitRepoUrl,
      createdById: command.createdById,
      status: AssignmentStatus.DRAFT,
    });

    if (command.dto.rubrics && command.dto.rubrics.length > 0) {
      for (const rubricDto of command.dto.rubrics) {
        await this.repo.createRubric({
          assignmentId: assignment.id,
          title: rubricDto.title,
          description: rubricDto.description,
          totalMaxPoints: rubricDto.totalMaxPoints,
          criteria: {
            create: rubricDto.criteria.map((c) => ({
              title: c.title,
              description: c.description,
              maxPoints: c.maxPoints,
              weightage: c.weightage || 1.0,
            })),
          },
        });
      }
    }

    const event = new AssignmentCreatedEvent(
      assignment.id,
      assignment.title,
      assignment.category,
      assignment.batchId,
      assignment.dueDate,
      assignment.totalPoints,
    );

    await this.integrationService.onAssignmentCreated(event);

    return AssignmentMapper.toAssignmentDto(assignment);
  }
}

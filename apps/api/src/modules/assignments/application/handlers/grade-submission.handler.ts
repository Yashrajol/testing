import { Injectable, Inject } from '@nestjs/common';
import { ASSIGNMENT_REPOSITORY_TOKEN, SubmissionStatus } from '../../constants/assignments.constants';
import { IAssignmentRepository } from '../../repositories/assignment.repository.interface';
import { GradeSubmissionCommand } from '../commands/grade-submission.command';
import { SubmissionResponseDto } from '../dtos/assignment-response.dto';
import { AssignmentMapper } from '../mappers/assignment.mapper';
import { AssignmentGradedEvent } from '../../domain/events/assignment-graded.event';
import { AssignmentIntegrationService } from '../services/assignment-integration.service';
import { SubmissionNotFoundException } from '../../domain/exceptions/assignment-exceptions';

@Injectable()
export class GradeSubmissionHandler {
  constructor(
    @Inject(ASSIGNMENT_REPOSITORY_TOKEN)
    private readonly repo: IAssignmentRepository,
    private readonly integrationService: AssignmentIntegrationService,
  ) {}

  async execute(command: GradeSubmissionCommand): Promise<SubmissionResponseDto> {
    const submission = await this.repo.findSubmissionById(command.submissionId);
    if (!submission) {
      throw new SubmissionNotFoundException(command.submissionId);
    }

    const assignment = await this.repo.findAssignmentById(submission.assignmentId);

    const graded = await this.repo.gradeSubmission(command.submissionId, {
      score: command.dto.score,
      gradedById: command.gradedById,
      status: SubmissionStatus.GRADED,
    });

    if (command.dto.feedbackComment) {
      await this.repo.createFeedback({
        submissionId: submission.id,
        authorId: command.gradedById,
        authorType: 'TEACHER',
        comment: command.dto.feedbackComment,
        criteriaScores: command.dto.criteriaScores,
      });
    }

    const event = new AssignmentGradedEvent(
      graded.id,
      graded.assignmentId,
      graded.studentId,
      graded.score || 0,
      assignment?.totalPoints || 100,
      command.gradedById,
      new Date(),
    );

    await this.integrationService.onAssignmentGraded(event);

    return AssignmentMapper.toSubmissionDto(graded);
  }
}

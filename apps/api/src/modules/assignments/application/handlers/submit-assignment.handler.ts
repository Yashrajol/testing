import { Injectable, Inject } from '@nestjs/common';
import { ASSIGNMENT_REPOSITORY_TOKEN, SubmissionStatus, GradingType } from '../../constants/assignments.constants';
import { IAssignmentRepository } from '../../repositories/assignment.repository.interface';
import { SubmitAssignmentCommand } from '../commands/submit-assignment.command';
import { SubmissionResponseDto } from '../dtos/assignment-response.dto';
import { AssignmentMapper } from '../mappers/assignment.mapper';
import { AssignmentSubmittedEvent } from '../../domain/events/assignment-submitted.event';
import { AssignmentIntegrationService } from '../services/assignment-integration.service';
import { AutoGradingHookService } from '../services/auto-grading-hook.service';
import {
  AssignmentNotFoundException,
  AssignmentClosedException,
  LateSubmissionNotAllowedException,
  MaxSubmissionsExceededException,
} from '../../domain/exceptions/assignment-exceptions';

@Injectable()
export class SubmitAssignmentHandler {
  constructor(
    @Inject(ASSIGNMENT_REPOSITORY_TOKEN)
    private readonly repo: IAssignmentRepository,
    private readonly integrationService: AssignmentIntegrationService,
    private readonly autoGradingHook: AutoGradingHookService,
  ) {}

  async execute(command: SubmitAssignmentCommand): Promise<SubmissionResponseDto> {
    const assignment = await this.repo.findAssignmentById(command.dto.assignmentId);
    if (!assignment) {
      throw new AssignmentNotFoundException(command.dto.assignmentId);
    }

    if (!assignment.isPublished()) {
      throw new AssignmentClosedException(command.dto.assignmentId);
    }

    const now = new Date();
    const isLate = assignment.isPastDueDate(now);

    if (isLate && !assignment.allowLateSubmission) {
      throw new LateSubmissionNotAllowedException(command.dto.assignmentId, assignment.dueDate);
    }

    const existingSubmissions = await this.repo.findSubmissionsByStudent(command.dto.assignmentId, command.dto.studentId);
    const attemptNumber = existingSubmissions.length + 1;

    if (attemptNumber > assignment.maxSubmissions) {
      throw new MaxSubmissionsExceededException(command.dto.studentId, assignment.maxSubmissions);
    }

    const submission = await this.repo.createSubmission({
      assignmentId: command.dto.assignmentId,
      studentId: command.dto.studentId,
      attemptNumber,
      richTextContent: command.dto.richTextContent,
      externalUrl: command.dto.externalUrl,
      gitRepositoryUrl: command.dto.gitRepositoryUrl,
      gitCommitHash: command.dto.gitCommitHash,
      status: SubmissionStatus.SUBMITTED,
      isLate,
      submittedAt: now,
    });

    if (command.dto.attachments && command.dto.attachments.length > 0) {
      for (const att of command.dto.attachments) {
        await this.repo.createAttachment({
          submissionId: submission.id,
          fileName: att.fileName,
          fileUrl: att.fileUrl,
          fileType: att.fileType,
          fileSizeBytes: att.fileSizeBytes,
        });
      }
    }

    // Auto grading hook trigger if assignment is configured for AUTO_GRADED
    if (assignment.gradingType === GradingType.AUTO_GRADED && command.dto.gitRepositoryUrl) {
      const autoResult = await this.autoGradingHook.evaluateCodeSubmission(
        submission.id,
        command.dto.gitRepositoryUrl,
        command.dto.gitCommitHash,
      );
      await this.repo.gradeSubmission(submission.id, {
        score: autoResult.score,
        gradedById: 'SYSTEM_AUTO_GRADER',
      });
    }

    const event = new AssignmentSubmittedEvent(
      submission.id,
      submission.assignmentId,
      submission.studentId,
      submission.attemptNumber,
      submission.isLate,
      submission.submittedAt,
    );

    await this.integrationService.onAssignmentSubmitted(event);

    return AssignmentMapper.toSubmissionDto(submission);
  }
}

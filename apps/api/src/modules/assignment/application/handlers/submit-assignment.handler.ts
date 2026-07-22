import { Injectable, Inject } from '@nestjs/common';
import { ASSIGNMENT_REPOSITORY_TOKEN, SubmissionStatus } from '../../constants/assignment.constants';
import { IAssignmentRepository } from '../../repositories/assignment.repository.interface';
import { SubmitAssignmentCommand } from '../commands/submit-assignment.command';
import { SubmissionResponseDto } from '../dtos/assignment-response.dto';
import { AssignmentMapper } from '../mappers/assignment.mapper';
import { AssignmentNotFoundException } from '../../domain/exceptions/assignment-not-found.exception';
import { AssignmentSubmittedEvent } from '../../domain/events/assignment-submitted.event';

@Injectable()
export class SubmitAssignmentHandler {
  constructor(
    @Inject(ASSIGNMENT_REPOSITORY_TOKEN)
    private readonly repo: IAssignmentRepository,
  ) {}

  async execute(command: SubmitAssignmentCommand): Promise<{ result: SubmissionResponseDto; event: AssignmentSubmittedEvent }> {
    const assignment = await this.repo.findAssignmentById(command.dto.assignmentId);
    if (!assignment) {
      throw new AssignmentNotFoundException(command.dto.assignmentId);
    }

    const latest = await this.repo.findLatestSubmission(command.dto.assignmentId, command.dto.studentId);
    const attemptNumber = latest ? latest.attemptNumber + 1 : 1;

    if (!assignment.allowResubmit && attemptNumber > 1) {
      throw new Error(`Resubmission is disabled for assignment ${assignment.id}`);
    }

    if (attemptNumber > assignment.maxSubmissions) {
      throw new Error(`Maximum submission attempts (${assignment.maxSubmissions}) reached.`);
    }

    const now = new Date();
    const extension = await this.repo.findActiveExtension(command.dto.assignmentId, command.dto.studentId);
    const effectiveDueDate = extension ? extension.extendedDueDate : assignment.dueDate;
    const isLate = now > effectiveDueDate;

    if (isLate && !assignment.allowLate) {
      throw new Error(`Assignment deadline has passed and late submissions are not allowed.`);
    }

    const created = await this.repo.createSubmission({
      assignmentId: command.dto.assignmentId,
      studentId: command.dto.studentId,
      attemptNumber,
      content: command.dto.content,
      submittedAt: now,
      isLate,
      status: SubmissionStatus.SUBMITTED,
    });

    const event = new AssignmentSubmittedEvent(
      created.id,
      created.assignmentId,
      created.studentId,
      created.attemptNumber,
      isLate,
    );

    return {
      result: AssignmentMapper.toSubmissionDto(created),
      event,
    };
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { ASSIGNMENT_REPOSITORY_TOKEN } from '../../constants/assignment.constants';
import { IAssignmentRepository } from '../../repositories/assignment.repository.interface';
import { ReopenSubmissionCommand } from '../commands/reopen-submission.command';
import { SubmissionResponseDto } from '../dtos/assignment-response.dto';
import { AssignmentMapper } from '../mappers/assignment.mapper';
import { AssignmentNotFoundException } from '../../domain/exceptions/assignment-not-found.exception';
import { AssignmentReopenedEvent } from '../../domain/events/assignment-reopened.event';

@Injectable()
export class ReopenSubmissionHandler {
  constructor(
    @Inject(ASSIGNMENT_REPOSITORY_TOKEN)
    private readonly repo: IAssignmentRepository,
  ) {}

  async execute(command: ReopenSubmissionCommand): Promise<{ result: SubmissionResponseDto; event: AssignmentReopenedEvent }> {
    const submission = await this.repo.findSubmissionById(command.submissionId);
    if (!submission) {
      throw new AssignmentNotFoundException(command.submissionId);
    }

    const updated = await this.repo.reopenSubmission(command.submissionId);
    const event = new AssignmentReopenedEvent(
      updated.id,
      updated.assignmentId,
      updated.studentId,
      command.reopenedBy,
    );

    return {
      result: AssignmentMapper.toSubmissionDto(updated),
      event,
    };
  }
}

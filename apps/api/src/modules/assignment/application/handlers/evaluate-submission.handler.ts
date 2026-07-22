import { Injectable, Inject } from '@nestjs/common';
import { ASSIGNMENT_REPOSITORY_TOKEN } from '../../constants/assignment.constants';
import { IAssignmentRepository } from '../../repositories/assignment.repository.interface';
import { EvaluateSubmissionCommand } from '../commands/evaluate-submission.command';
import { SubmissionResponseDto } from '../dtos/assignment-response.dto';
import { AssignmentMapper } from '../mappers/assignment.mapper';
import { AssignmentNotFoundException } from '../../domain/exceptions/assignment-not-found.exception';
import { AssignmentEvaluatedEvent } from '../../domain/events/assignment-evaluated.event';

@Injectable()
export class EvaluateSubmissionHandler {
  constructor(
    @Inject(ASSIGNMENT_REPOSITORY_TOKEN)
    private readonly repo: IAssignmentRepository,
  ) {}

  async execute(command: EvaluateSubmissionCommand): Promise<{ result: SubmissionResponseDto; event: AssignmentEvaluatedEvent }> {
    const submission = await this.repo.findSubmissionById(command.submissionId);
    if (!submission) {
      throw new AssignmentNotFoundException(command.submissionId);
    }

    const updated = await this.repo.updateSubmissionEvaluation(
      command.submissionId,
      command.dto.score,
      command.evaluatorId,
    );

    if (command.dto.feedback && command.evaluatorId) {
      await this.repo.addFeedback({
        submissionId: command.submissionId,
        authorId: command.evaluatorId,
        comment: command.dto.feedback,
        scoreGiven: command.dto.score,
      });
    }

    const event = new AssignmentEvaluatedEvent(
      updated.id,
      updated.assignmentId,
      updated.studentId,
      updated.score,
      command.evaluatorId,
    );

    return {
      result: AssignmentMapper.toSubmissionDto(updated),
      event,
    };
  }
}

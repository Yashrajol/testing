import { Injectable, Inject } from '@nestjs/common';
import { ASSIGNMENT_REPOSITORY_TOKEN } from '../../constants/assignments.constants';
import { IAssignmentRepository } from '../../repositories/assignment.repository.interface';
import { AddFeedbackCommand } from '../commands/add-feedback.command';
import { FeedbackResponseDto } from '../dtos/assignment-response.dto';
import { AssignmentMapper } from '../mappers/assignment.mapper';

@Injectable()
export class AddFeedbackHandler {
  constructor(
    @Inject(ASSIGNMENT_REPOSITORY_TOKEN)
    private readonly repo: IAssignmentRepository,
  ) {}

  async execute(command: AddFeedbackCommand): Promise<FeedbackResponseDto> {
    const feedback = await this.repo.createFeedback({
      submissionId: command.submissionId,
      authorId: command.authorId,
      authorType: 'TEACHER',
      comment: command.dto.comment,
      audioFeedbackUrl: command.dto.audioFeedbackUrl,
    });

    return AssignmentMapper.toFeedbackDto(feedback);
  }
}

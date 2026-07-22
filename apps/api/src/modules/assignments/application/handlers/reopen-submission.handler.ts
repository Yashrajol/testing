import { Injectable, Inject } from '@nestjs/common';
import { ASSIGNMENT_REPOSITORY_TOKEN, SubmissionStatus } from '../../constants/assignments.constants';
import { IAssignmentRepository } from '../../repositories/assignment.repository.interface';
import { ReopenSubmissionCommand } from '../commands/reopen-submission.command';
import { SubmissionResponseDto } from '../dtos/assignment-response.dto';
import { AssignmentMapper } from '../mappers/assignment.mapper';

@Injectable()
export class ReopenSubmissionHandler {
  constructor(
    @Inject(ASSIGNMENT_REPOSITORY_TOKEN)
    private readonly repo: IAssignmentRepository,
  ) {}

  async execute(command: ReopenSubmissionCommand): Promise<SubmissionResponseDto> {
    const updated = await this.repo.updateSubmissionStatus(command.submissionId, SubmissionStatus.REOPENED);
    return AssignmentMapper.toSubmissionDto(updated);
  }
}

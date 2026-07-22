import { Injectable, Inject } from '@nestjs/common';
import { ASSIGNMENT_REPOSITORY_TOKEN, SubmissionStatus } from '../../constants/assignments.constants';
import { IAssignmentRepository } from '../../repositories/assignment.repository.interface';
import { SaveDraftSubmissionCommand } from '../commands/save-draft-submission.command';
import { SubmissionResponseDto } from '../dtos/assignment-response.dto';
import { AssignmentMapper } from '../mappers/assignment.mapper';

@Injectable()
export class SaveDraftSubmissionHandler {
  constructor(
    @Inject(ASSIGNMENT_REPOSITORY_TOKEN)
    private readonly repo: IAssignmentRepository,
  ) {}

  async execute(command: SaveDraftSubmissionCommand): Promise<SubmissionResponseDto> {
    const submission = await this.repo.createSubmission({
      assignmentId: command.dto.assignmentId,
      studentId: command.dto.studentId,
      richTextContent: command.dto.richTextContent,
      externalUrl: command.dto.externalUrl,
      gitRepositoryUrl: command.dto.gitRepositoryUrl,
      gitCommitHash: command.dto.gitCommitHash,
      status: SubmissionStatus.DRAFT,
      submittedAt: new Date(),
    });

    return AssignmentMapper.toSubmissionDto(submission);
  }
}

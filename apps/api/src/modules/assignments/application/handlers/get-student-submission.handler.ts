import { Injectable, Inject } from '@nestjs/common';
import { ASSIGNMENT_REPOSITORY_TOKEN } from '../../constants/assignments.constants';
import { IAssignmentRepository } from '../../repositories/assignment.repository.interface';
import { GetStudentSubmissionQuery } from '../queries/get-student-submission.query';
import { SubmissionResponseDto } from '../dtos/assignment-response.dto';
import { AssignmentMapper } from '../mappers/assignment.mapper';
import { SubmissionNotFoundException } from '../../domain/exceptions/assignment-exceptions';

@Injectable()
export class GetStudentSubmissionHandler {
  constructor(
    @Inject(ASSIGNMENT_REPOSITORY_TOKEN)
    private readonly repo: IAssignmentRepository,
  ) {}

  async execute(query: GetStudentSubmissionQuery): Promise<SubmissionResponseDto> {
    const submissions = await this.repo.findSubmissionsByStudent(query.assignmentId, query.studentId);
    if (!submissions || submissions.length === 0) {
      throw new SubmissionNotFoundException(`Assignment ${query.assignmentId} / Student ${query.studentId}`);
    }
    const latestSubmission = submissions[submissions.length - 1];
    const attachments = await this.repo.findAttachmentsBySubmission(latestSubmission.id);
    const feedbacks = await this.repo.findFeedbacksBySubmission(latestSubmission.id);

    return AssignmentMapper.toSubmissionDto(latestSubmission, attachments, feedbacks);
  }
}

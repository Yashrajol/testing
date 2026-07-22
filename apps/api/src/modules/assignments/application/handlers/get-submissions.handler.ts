import { Injectable, Inject } from '@nestjs/common';
import { ASSIGNMENT_REPOSITORY_TOKEN } from '../../constants/assignments.constants';
import { IAssignmentRepository } from '../../repositories/assignment.repository.interface';
import { GetSubmissionsQuery } from '../queries/get-submissions.query';
import { SubmissionResponseDto } from '../dtos/assignment-response.dto';
import { AssignmentMapper } from '../mappers/assignment.mapper';

@Injectable()
export class GetSubmissionsHandler {
  constructor(
    @Inject(ASSIGNMENT_REPOSITORY_TOKEN)
    private readonly repo: IAssignmentRepository,
  ) {}

  async execute(query: GetSubmissionsQuery): Promise<SubmissionResponseDto[]> {
    const submissions = await this.repo.findSubmissions(query.options);
    return submissions.map((s) => AssignmentMapper.toSubmissionDto(s));
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { ASSIGNMENT_REPOSITORY_TOKEN } from '../../constants/assignment.constants';
import { IAssignmentRepository } from '../../repositories/assignment.repository.interface';
import { ListSubmissionsQuery } from '../queries/list-submissions.query';
import { SubmissionResponseDto } from '../dtos/assignment-response.dto';
import { AssignmentMapper } from '../mappers/assignment.mapper';

@Injectable()
export class ListSubmissionsHandler {
  constructor(
    @Inject(ASSIGNMENT_REPOSITORY_TOKEN)
    private readonly repo: IAssignmentRepository,
  ) {}

  async execute(query: ListSubmissionsQuery): Promise<{ items: SubmissionResponseDto[]; total: number }> {
    const { items, total } = await this.repo.findSubmissions(query.options);
    return {
      items: items.map((ent) => AssignmentMapper.toSubmissionDto(ent)),
      total,
    };
  }
}

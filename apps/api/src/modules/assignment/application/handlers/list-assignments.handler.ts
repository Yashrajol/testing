import { Injectable, Inject } from '@nestjs/common';
import { ASSIGNMENT_REPOSITORY_TOKEN } from '../../constants/assignment.constants';
import { IAssignmentRepository } from '../../repositories/assignment.repository.interface';
import { ListAssignmentsQuery } from '../queries/list-assignments.query';
import { AssignmentResponseDto } from '../dtos/assignment-response.dto';
import { AssignmentMapper } from '../mappers/assignment.mapper';

@Injectable()
export class ListAssignmentsHandler {
  constructor(
    @Inject(ASSIGNMENT_REPOSITORY_TOKEN)
    private readonly repo: IAssignmentRepository,
  ) {}

  async execute(query: ListAssignmentsQuery): Promise<{ items: AssignmentResponseDto[]; total: number }> {
    const { items, total } = await this.repo.findAssignments(query.options);
    return {
      items: items.map((ent) => AssignmentMapper.toAssignmentDto(ent)),
      total,
    };
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { ASSIGNMENT_REPOSITORY_TOKEN } from '../../constants/assignment.constants';
import { IAssignmentRepository } from '../../repositories/assignment.repository.interface';
import { GetAssignmentQuery } from '../queries/get-assignment.query';
import { AssignmentResponseDto } from '../dtos/assignment-response.dto';
import { AssignmentMapper } from '../mappers/assignment.mapper';
import { AssignmentNotFoundException } from '../../domain/exceptions/assignment-not-found.exception';

@Injectable()
export class GetAssignmentHandler {
  constructor(
    @Inject(ASSIGNMENT_REPOSITORY_TOKEN)
    private readonly repo: IAssignmentRepository,
  ) {}

  async execute(query: GetAssignmentQuery): Promise<AssignmentResponseDto> {
    const entity = await this.repo.findAssignmentById(query.assignmentId);
    if (!entity) {
      throw new AssignmentNotFoundException(query.assignmentId);
    }
    return AssignmentMapper.toAssignmentDto(entity);
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { ASSIGNMENT_REPOSITORY_TOKEN } from '../../constants/assignments.constants';
import { IAssignmentRepository } from '../../repositories/assignment.repository.interface';
import { GetAssignmentQuery } from '../queries/get-assignment.query';
import { AssignmentResponseDto } from '../dtos/assignment-response.dto';
import { AssignmentMapper } from '../mappers/assignment.mapper';
import { AssignmentNotFoundException } from '../../domain/exceptions/assignment-exceptions';

@Injectable()
export class GetAssignmentHandler {
  constructor(
    @Inject(ASSIGNMENT_REPOSITORY_TOKEN)
    private readonly repo: IAssignmentRepository,
  ) {}

  async execute(query: GetAssignmentQuery): Promise<AssignmentResponseDto> {
    const assignment = await this.repo.findAssignmentById(query.id);
    if (!assignment) {
      throw new AssignmentNotFoundException(query.id);
    }
    const rubrics = await this.repo.findRubricsByAssignment(query.id);
    const attachments = await this.repo.findAttachmentsByAssignment(query.id);

    return AssignmentMapper.toAssignmentDto(assignment, rubrics, attachments);
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { ASSIGNMENT_REPOSITORY_TOKEN } from '../../constants/assignment.constants';
import { IAssignmentRepository } from '../../repositories/assignment.repository.interface';
import { PublishAssignmentCommand } from '../commands/publish-assignment.command';
import { AssignmentResponseDto } from '../dtos/assignment-response.dto';
import { AssignmentMapper } from '../mappers/assignment.mapper';
import { AssignmentNotFoundException } from '../../domain/exceptions/assignment-not-found.exception';
import { AssignmentPublishedEvent } from '../../domain/events/assignment-published.event';

@Injectable()
export class PublishAssignmentHandler {
  constructor(
    @Inject(ASSIGNMENT_REPOSITORY_TOKEN)
    private readonly repo: IAssignmentRepository,
  ) {}

  async execute(command: PublishAssignmentCommand): Promise<{ result: AssignmentResponseDto; event: AssignmentPublishedEvent }> {
    const existing = await this.repo.findAssignmentById(command.assignmentId);
    if (!existing) {
      throw new AssignmentNotFoundException(command.assignmentId);
    }

    const published = await this.repo.publishAssignment(command.assignmentId);
    const event = new AssignmentPublishedEvent(published.id, published.batchId);

    return {
      result: AssignmentMapper.toAssignmentDto(published),
      event,
    };
  }
}

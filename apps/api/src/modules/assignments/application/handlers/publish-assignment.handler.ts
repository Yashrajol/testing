import { Injectable, Inject } from '@nestjs/common';
import { ASSIGNMENT_REPOSITORY_TOKEN, AssignmentStatus } from '../../constants/assignments.constants';
import { IAssignmentRepository } from '../../repositories/assignment.repository.interface';
import { PublishAssignmentCommand } from '../commands/publish-assignment.command';
import { AssignmentResponseDto } from '../dtos/assignment-response.dto';
import { AssignmentMapper } from '../mappers/assignment.mapper';

@Injectable()
export class PublishAssignmentHandler {
  constructor(
    @Inject(ASSIGNMENT_REPOSITORY_TOKEN)
    private readonly repo: IAssignmentRepository,
  ) {}

  async execute(command: PublishAssignmentCommand): Promise<AssignmentResponseDto> {
    const updated = await this.repo.updateAssignment(command.id, {
      status: AssignmentStatus.PUBLISHED,
      publishedAt: new Date(),
    });
    return AssignmentMapper.toAssignmentDto(updated);
  }
}

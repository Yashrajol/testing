import { Injectable, Inject } from '@nestjs/common';
import { ASSIGNMENT_REPOSITORY_TOKEN, SubmissionStatus } from '../../constants/assignments.constants';
import { IAssignmentRepository } from '../../repositories/assignment.repository.interface';
import { ReturnSubmissionCommand } from '../commands/return-submission.command';
import { SubmissionResponseDto } from '../dtos/assignment-response.dto';
import { AssignmentMapper } from '../mappers/assignment.mapper';
import { AssignmentReturnedEvent } from '../../domain/events/assignment-returned.event';
import { AssignmentIntegrationService } from '../services/assignment-integration.service';

@Injectable()
export class ReturnSubmissionHandler {
  constructor(
    @Inject(ASSIGNMENT_REPOSITORY_TOKEN)
    private readonly repo: IAssignmentRepository,
    private readonly integrationService: AssignmentIntegrationService,
  ) {}

  async execute(command: ReturnSubmissionCommand): Promise<SubmissionResponseDto> {
    const updated = await this.repo.updateSubmissionStatus(command.submissionId, SubmissionStatus.RETURNED);

    const event = new AssignmentReturnedEvent(
      updated.id,
      updated.assignmentId,
      updated.studentId,
      command.returnedById,
      command.dto?.reason,
    );

    await this.integrationService.onAssignmentReturned(event);

    return AssignmentMapper.toSubmissionDto(updated);
  }
}

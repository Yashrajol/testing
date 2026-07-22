import { Injectable, Inject } from '@nestjs/common';
import { ASSIGNMENT_REPOSITORY_TOKEN } from '../../constants/assignments.constants';
import { IAssignmentRepository } from '../../repositories/assignment.repository.interface';
import { ResubmitAssignmentCommand } from '../commands/resubmit-assignment.command';
import { SubmitAssignmentCommand } from '../commands/submit-assignment.command';
import { SubmitAssignmentHandler } from './submit-assignment.handler';
import { SubmissionResponseDto } from '../dtos/assignment-response.dto';

@Injectable()
export class ResubmitAssignmentHandler {
  constructor(
    private readonly submitHandler: SubmitAssignmentHandler,
  ) {}

  async execute(command: ResubmitAssignmentCommand): Promise<SubmissionResponseDto> {
    return this.submitHandler.execute(new SubmitAssignmentCommand(command.dto));
  }
}

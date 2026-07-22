import { Injectable, Inject } from '@nestjs/common';
import { ASSESSMENT_REPOSITORY_TOKEN, AttemptStatus } from '../../constants/assessment.constants';
import { IAssessmentRepository } from '../../repositories/assessment.repository.interface';
import { StartAttemptCommand } from '../commands/start-attempt.command';
import { AssessmentAttemptResponseDto } from '../dtos/assessment-response.dto';
import { AssessmentMapper } from '../mappers/assessment.mapper';
import { AssessmentNotFoundException } from '../../domain/exceptions/assessment-not-found.exception';
import { AssessmentAttemptStartedEvent } from '../../domain/events/assessment-attempt-started.event';

@Injectable()
export class StartAttemptHandler {
  constructor(
    @Inject(ASSESSMENT_REPOSITORY_TOKEN)
    private readonly repo: IAssessmentRepository,
  ) {}

  async execute(command: StartAttemptCommand): Promise<{ result: AssessmentAttemptResponseDto; event: AssessmentAttemptStartedEvent }> {
    const assessment = await this.repo.findAssessmentById(command.assessmentId);
    if (!assessment) {
      throw new AssessmentNotFoundException(command.assessmentId);
    }

    const attempt = await this.repo.startAttempt({
      assessmentId: command.assessmentId,
      studentId: command.studentId,
      startTime: new Date(),
      status: AttemptStatus.IN_PROGRESS,
    });

    const event = new AssessmentAttemptStartedEvent(attempt.id, command.assessmentId, command.studentId);

    return {
      result: AssessmentMapper.toAttemptDto(attempt),
      event,
    };
  }
}

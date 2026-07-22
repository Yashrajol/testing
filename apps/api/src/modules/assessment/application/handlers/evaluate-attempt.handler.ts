import { Injectable, Inject } from '@nestjs/common';
import { ASSESSMENT_REPOSITORY_TOKEN, AttemptStatus, EvaluatorType } from '../../constants/assessment.constants';
import { IAssessmentRepository } from '../../repositories/assessment.repository.interface';
import { EvaluateAttemptCommand } from '../commands/evaluate-attempt.command';
import { AssessmentAttemptResponseDto } from '../dtos/assessment-response.dto';
import { AssessmentMapper } from '../mappers/assessment.mapper';
import { AssessmentNotFoundException } from '../../domain/exceptions/assessment-not-found.exception';
import { AssessmentAttemptEvaluatedEvent } from '../../domain/events/assessment-attempt-evaluated.event';

@Injectable()
export class EvaluateAttemptHandler {
  constructor(
    @Inject(ASSESSMENT_REPOSITORY_TOKEN)
    private readonly repo: IAssessmentRepository,
  ) {}

  async execute(command: EvaluateAttemptCommand): Promise<{ result: AssessmentAttemptResponseDto; event: AssessmentAttemptEvaluatedEvent }> {
    const attempt = await this.repo.findAttemptById(command.attemptId);
    if (!attempt) {
      throw new AssessmentNotFoundException(command.attemptId);
    }

    const assessment = await this.repo.findAssessmentById(attempt.assessmentId);
    const maxMarks = assessment ? assessment.totalMarks : 100;
    const percentage = Math.round((command.dto.scoreGranted / maxMarks) * 100);

    await this.repo.saveGrading({
      attemptId: command.attemptId,
      evaluatorId: command.evaluatorId,
      evaluatorType: command.dto.evaluatorType || EvaluatorType.MANUAL,
      scoreGranted: command.dto.scoreGranted,
      comments: command.dto.comments,
      evaluatedAt: new Date(),
    });

    const updated = await this.repo.updateAttempt(command.attemptId, {
      totalScore: command.dto.scoreGranted,
      percentage,
      status: AttemptStatus.EVALUATED,
    });

    const event = new AssessmentAttemptEvaluatedEvent(command.attemptId, command.dto.scoreGranted, percentage);

    return {
      result: AssessmentMapper.toAttemptDto(updated),
      event,
    };
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { ASSESSMENT_REPOSITORY_TOKEN, AttemptStatus } from '../../constants/assessment.constants';
import { IAssessmentRepository } from '../../repositories/assessment.repository.interface';
import { FinalizeAttemptCommand } from '../commands/finalize-attempt.command';
import { AssessmentAttemptResponseDto } from '../dtos/assessment-response.dto';
import { AssessmentMapper } from '../mappers/assessment.mapper';
import { AssessmentNotFoundException } from '../../domain/exceptions/assessment-not-found.exception';
import { AssessmentAttemptSubmittedEvent } from '../../domain/events/assessment-attempt-submitted.event';

@Injectable()
export class FinalizeAttemptHandler {
  constructor(
    @Inject(ASSESSMENT_REPOSITORY_TOKEN)
    private readonly repo: IAssessmentRepository,
  ) {}

  async execute(command: FinalizeAttemptCommand): Promise<{ result: AssessmentAttemptResponseDto; event: AssessmentAttemptSubmittedEvent }> {
    const attempt = await this.repo.findAttemptById(command.attemptId);
    if (!attempt) {
      throw new AssessmentNotFoundException(command.attemptId);
    }

    const answers = await this.repo.findAnswersByAttempt(command.attemptId);
    const totalScore = answers.reduce((acc, ans) => acc + (ans.marksObtained || 0), 0);
    const endTime = new Date();
    const durationSeconds = Math.floor((endTime.getTime() - new Date(attempt.startTime).getTime()) / 1000);

    const assessment = await this.repo.findAssessmentById(attempt.assessmentId);
    const maxMarks = assessment ? assessment.totalMarks : 100;
    const percentage = Math.round((totalScore / maxMarks) * 100);

    const updated = await this.repo.updateAttempt(command.attemptId, {
      endTime,
      durationSeconds,
      totalScore,
      percentage,
      status: AttemptStatus.SUBMITTED,
    });

    const event = new AssessmentAttemptSubmittedEvent(command.attemptId, attempt.studentId);

    return {
      result: AssessmentMapper.toAttemptDto(updated),
      event,
    };
  }
}

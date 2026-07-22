import { Injectable, Inject } from '@nestjs/common';
import { ASSESSMENT_REPOSITORY_TOKEN } from '../../constants/assessment.constants';
import { IAssessmentRepository } from '../../repositories/assessment.repository.interface';
import { SubmitAnswerCommand } from '../commands/submit-answer.command';
import { AssessmentNotFoundException } from '../../domain/exceptions/assessment-not-found.exception';

@Injectable()
export class SubmitAnswerHandler {
  constructor(
    @Inject(ASSESSMENT_REPOSITORY_TOKEN)
    private readonly repo: IAssessmentRepository,
  ) {}

  async execute(command: SubmitAnswerCommand): Promise<{ answerId: string; autoEvaluated: boolean; isCorrect?: boolean }> {
    const attempt = await this.repo.findAttemptById(command.attemptId);
    if (!attempt) {
      throw new AssessmentNotFoundException(command.attemptId);
    }

    const question = await this.repo.findQuestionById(command.dto.questionId);
    let isCorrect: boolean | undefined = undefined;
    let marksObtained = 0;

    if (question && question.correctAnswer && command.dto.responseValue) {
      isCorrect = question.correctAnswer.trim().toLowerCase() === command.dto.responseValue.trim().toLowerCase();
      marksObtained = isCorrect ? question.marks : -question.negativeMarks;
    }

    const answer = await this.repo.saveAnswer({
      attemptId: command.attemptId,
      questionId: command.dto.questionId,
      responseValue: command.dto.responseValue,
      fileUrl: command.dto.fileUrl,
      isCorrect,
      marksObtained,
      savedAt: new Date(),
    });

    return {
      answerId: answer.id,
      autoEvaluated: isCorrect !== undefined,
      isCorrect,
    };
  }
}

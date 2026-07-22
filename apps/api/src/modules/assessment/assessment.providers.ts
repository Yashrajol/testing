import { Provider } from '@nestjs/common';
import { ASSESSMENT_REPOSITORY_TOKEN } from './constants/assessment.constants';
import { AssessmentRepository } from './repositories/assessment.repository';
import { CreateAssessmentHandler } from './application/handlers/create-assessment.handler';
import { StartAttemptHandler } from './application/handlers/start-attempt.handler';
import { SubmitAnswerHandler } from './application/handlers/submit-answer.handler';
import { FinalizeAttemptHandler } from './application/handlers/finalize-attempt.handler';
import { EvaluateAttemptHandler } from './application/handlers/evaluate-attempt.handler';
import { GetAssessmentHandler } from './application/handlers/get-assessment.handler';
import { ListAssessmentsHandler } from './application/handlers/list-assessments.handler';

export const ASSESSMENT_PROVIDERS: Provider[] = [
  AssessmentRepository,
  {
    provide: ASSESSMENT_REPOSITORY_TOKEN,
    useClass: AssessmentRepository,
  },
  CreateAssessmentHandler,
  StartAttemptHandler,
  SubmitAnswerHandler,
  FinalizeAttemptHandler,
  EvaluateAttemptHandler,
  GetAssessmentHandler,
  ListAssessmentsHandler,
];

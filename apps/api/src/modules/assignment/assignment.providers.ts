import { Provider } from '@nestjs/common';
import { ASSIGNMENT_REPOSITORY_TOKEN } from './constants/assignment.constants';
import { AssignmentRepository } from './repositories/assignment.repository';

import { CreateAssignmentHandler } from './application/handlers/create-assignment.handler';
import { PublishAssignmentHandler } from './application/handlers/publish-assignment.handler';
import { SubmitAssignmentHandler } from './application/handlers/submit-assignment.handler';
import { EvaluateSubmissionHandler } from './application/handlers/evaluate-submission.handler';
import { ReopenSubmissionHandler } from './application/handlers/reopen-submission.handler';
import { GrantExtensionHandler } from './application/handlers/grant-extension.handler';

import { GetAssignmentHandler } from './application/handlers/get-assignment.handler';
import { ListAssignmentsHandler } from './application/handlers/list-assignments.handler';
import { ListSubmissionsHandler } from './application/handlers/list-submissions.handler';

export const ASSIGNMENT_PROVIDERS: Provider[] = [
  AssignmentRepository,
  {
    provide: ASSIGNMENT_REPOSITORY_TOKEN,
    useClass: AssignmentRepository,
  },
  CreateAssignmentHandler,
  PublishAssignmentHandler,
  SubmitAssignmentHandler,
  EvaluateSubmissionHandler,
  ReopenSubmissionHandler,
  GrantExtensionHandler,
  GetAssignmentHandler,
  ListAssignmentsHandler,
  ListSubmissionsHandler,
];

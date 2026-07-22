import { Provider } from '@nestjs/common';
import { ASSIGNMENT_REPOSITORY_TOKEN } from './constants/assignments.constants';
import { AssignmentRepository } from './repositories/assignment.repository';
import { AssignmentIntegrationService } from './application/services/assignment-integration.service';
import { AssignmentAnalyticsService } from './application/services/assignment-analytics.service';
import { AutoGradingHookService } from './application/services/auto-grading-hook.service';
import { CreateAssignmentHandler } from './application/handlers/create-assignment.handler';
import { UpdateAssignmentHandler } from './application/handlers/update-assignment.handler';
import { DeleteAssignmentHandler } from './application/handlers/delete-assignment.handler';
import { PublishAssignmentHandler } from './application/handlers/publish-assignment.handler';
import { CloneAssignmentHandler } from './application/handlers/clone-assignment.handler';
import { ArchiveAssignmentHandler } from './application/handlers/archive-assignment.handler';
import { SubmitAssignmentHandler } from './application/handlers/submit-assignment.handler';
import { SaveDraftSubmissionHandler } from './application/handlers/save-draft-submission.handler';
import { ResubmitAssignmentHandler } from './application/handlers/resubmit-assignment.handler';
import { GradeSubmissionHandler } from './application/handlers/grade-submission.handler';
import { AddFeedbackHandler } from './application/handlers/add-feedback.handler';
import { ReturnSubmissionHandler } from './application/handlers/return-submission.handler';
import { ReopenSubmissionHandler } from './application/handlers/reopen-submission.handler';
import { GetAssignmentHandler } from './application/handlers/get-assignment.handler';
import { GetSubmissionsHandler } from './application/handlers/get-submissions.handler';
import { GetStudentSubmissionHandler } from './application/handlers/get-student-submission.handler';
import { GetAssignmentDashboardHandler } from './application/handlers/get-assignment-dashboard.handler';
import { GetPendingAssignmentsHandler } from './application/handlers/get-pending-assignments.handler';
import { GetOverdueAssignmentsHandler } from './application/handlers/get-overdue-assignments.handler';
import { GetCompletionReportHandler } from './application/handlers/get-completion-report.handler';
import { GetPerformanceReportHandler } from './application/handlers/get-performance-report.handler';

export const assignmentsProviders: Provider[] = [
  {
    provide: ASSIGNMENT_REPOSITORY_TOKEN,
    useClass: AssignmentRepository,
  },
  AssignmentIntegrationService,
  AssignmentAnalyticsService,
  AutoGradingHookService,
  CreateAssignmentHandler,
  UpdateAssignmentHandler,
  DeleteAssignmentHandler,
  PublishAssignmentHandler,
  CloneAssignmentHandler,
  ArchiveAssignmentHandler,
  SubmitAssignmentHandler,
  SaveDraftSubmissionHandler,
  ResubmitAssignmentHandler,
  GradeSubmissionHandler,
  AddFeedbackHandler,
  ReturnSubmissionHandler,
  ReopenSubmissionHandler,
  GetAssignmentHandler,
  GetSubmissionsHandler,
  GetStudentSubmissionHandler,
  GetAssignmentDashboardHandler,
  GetPendingAssignmentsHandler,
  GetOverdueAssignmentsHandler,
  GetCompletionReportHandler,
  GetPerformanceReportHandler,
];

import { AssignmentEntity } from '../domain/entities/assignment.entity';
import { SubmissionEntity } from '../domain/entities/submission.entity';
import { RubricEntity } from '../domain/entities/rubric.entity';
import { FeedbackEntity } from '../domain/entities/feedback.entity';
import { AttachmentEntity } from '../domain/entities/attachment.entity';
import { AssignmentFilterOptions, SubmissionFilterOptions } from '../types/assignments.types';
import { SubmissionStatus } from '../constants/assignments.constants';

export interface IAssignmentRepository {
  createAssignment(data: any): Promise<AssignmentEntity>;
  updateAssignment(id: string, data: any): Promise<AssignmentEntity>;
  deleteAssignment(id: string): Promise<void>;
  findAssignmentById(id: string): Promise<AssignmentEntity | null>;
  findAssignments(options: AssignmentFilterOptions): Promise<AssignmentEntity[]>;

  createSubmission(data: any): Promise<SubmissionEntity>;
  updateSubmissionStatus(id: string, status: SubmissionStatus): Promise<SubmissionEntity>;
  gradeSubmission(id: string, data: { score: number; gradedById: string; status?: SubmissionStatus }): Promise<SubmissionEntity>;
  findSubmissionById(id: string): Promise<SubmissionEntity | null>;
  findSubmissions(options: SubmissionFilterOptions): Promise<SubmissionEntity[]>;
  findSubmissionsByStudent(assignmentId: string, studentId: string): Promise<SubmissionEntity[]>;

  createRubric(data: any): Promise<RubricEntity>;
  findRubricsByAssignment(assignmentId: string): Promise<RubricEntity[]>;

  createFeedback(data: any): Promise<FeedbackEntity>;
  findFeedbacksBySubmission(submissionId: string): Promise<FeedbackEntity[]>;

  createAttachment(data: any): Promise<AttachmentEntity>;
  findAttachmentsByAssignment(assignmentId: string): Promise<AttachmentEntity[]>;
  findAttachmentsBySubmission(submissionId: string): Promise<AttachmentEntity[]>;
}

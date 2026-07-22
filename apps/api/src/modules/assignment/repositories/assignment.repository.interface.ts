import { AssignmentFilterOptions, SubmissionFilterOptions } from '../types/assignment.types';

export interface IAssignmentRepository {
  createAssignment(data: any): Promise<any>;
  findAssignmentById(id: string): Promise<any | null>;
  publishAssignment(id: string): Promise<any>;
  findAssignments(options: AssignmentFilterOptions): Promise<{ items: any[]; total: number }>;

  createSubmission(data: any): Promise<any>;
  findSubmissionById(id: string): Promise<any | null>;
  findLatestSubmission(assignmentId: string, studentId: string): Promise<any | null>;
  updateSubmissionEvaluation(id: string, score: number, evaluatorId?: string): Promise<any>;
  reopenSubmission(id: string): Promise<any>;
  findSubmissions(options: SubmissionFilterOptions): Promise<{ items: any[]; total: number }>;

  addFeedback(data: any): Promise<any>;
  grantExtension(data: any): Promise<any>;
  findActiveExtension(assignmentId: string, studentId: string): Promise<any | null>;
}

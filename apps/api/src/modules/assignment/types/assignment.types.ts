import { AssignmentStatus, SubmissionStatus } from '../constants/assignment.constants';

export interface AssignmentFilterOptions {
  batchId?: string;
  status?: AssignmentStatus;
  search?: string;
  skip?: number;
  take?: number;
}

export interface SubmissionFilterOptions {
  assignmentId?: string;
  studentId?: string;
  status?: SubmissionStatus;
  skip?: number;
  take?: number;
}

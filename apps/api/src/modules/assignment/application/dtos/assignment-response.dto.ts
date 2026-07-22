import { AssignmentStatus, SubmissionStatus } from '../../constants/assignment.constants';

export class AssignmentResponseDto {
  id!: string;
  batchId!: string;
  title!: string;
  description?: string;
  totalPoints!: number;
  dueDate!: Date;
  allowLate!: boolean;
  allowResubmit!: boolean;
  maxSubmissions!: number;
  status!: AssignmentStatus;
  publishedAt?: Date;
  createdAt!: Date;
  updatedAt!: Date;
}

export class SubmissionResponseDto {
  id!: string;
  assignmentId!: string;
  studentId!: string;
  attemptNumber!: number;
  content?: string;
  submittedAt!: Date;
  isLate!: boolean;
  status!: SubmissionStatus;
  score?: number;
  evaluatedAt?: Date;
  evaluatorId?: string;
  createdAt!: Date;
  updatedAt!: Date;
}

export class ExtensionResponseDto {
  id!: string;
  assignmentId!: string;
  studentId!: string;
  extendedDueDate!: Date;
  reason?: string;
  grantedBy!: string;
  createdAt!: Date;
}

import { AssignmentCategory, AssignmentStatus, SubmissionStatus, GradingType } from '../constants/assignments.constants';

export interface AssignmentFilterOptions {
  organizationId?: string;
  tenantId?: string;
  batchId?: string;
  classId?: string;
  subjectId?: string;
  teacherId?: string;
  category?: AssignmentCategory;
  status?: AssignmentStatus;
  search?: string;
  dueDateFrom?: Date;
  dueDateTo?: Date;
  skip?: number;
  take?: number;
}

export interface SubmissionFilterOptions {
  assignmentId?: string;
  studentId?: string;
  status?: SubmissionStatus;
  isLate?: boolean;
  isGraded?: boolean;
  skip?: number;
  take?: number;
}

export interface AssignmentMetrics {
  totalAssigned: number;
  totalSubmitted: number;
  totalGraded: number;
  submissionRate: number;
  completionRate: number;
  lateSubmissionRate: number;
  averageScore: number;
}

export interface TopicWeaknessItem {
  topicName: string;
  averageScorePercent: number;
  strugglingStudentsCount: number;
}

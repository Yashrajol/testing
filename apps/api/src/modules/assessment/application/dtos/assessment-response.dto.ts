import { AssessmentType, AttemptStatus } from '../../constants/assessment.constants';

export class AssessmentResponseDto {
  id!: string;
  title!: string;
  description?: string;
  type!: AssessmentType;
  timeLimitMins?: number;
  totalMarks!: number;
  passPercentage!: number;
  instructions?: string;
  createdAt!: Date;
  updatedAt!: Date;
}

export class AssessmentAttemptResponseDto {
  id!: string;
  assessmentId!: string;
  studentId!: string;
  startTime!: Date;
  endTime?: Date;
  durationSeconds?: number;
  totalScore?: number;
  percentage?: number;
  status!: AttemptStatus;
  competencyBreakdown?: Record<string, any>;
  questionAnalytics?: Record<string, any>;
  learningOutcome?: string;
  createdAt!: Date;
  updatedAt!: Date;
}

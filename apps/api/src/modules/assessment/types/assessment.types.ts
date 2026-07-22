import { AssessmentType, QuestionType, AttemptStatus } from '../constants/assessment.constants';

export interface AssessmentFilterOptions {
  type?: AssessmentType;
  search?: string;
  studentId?: string;
  bankId?: string;
  skip?: number;
  take?: number;
}

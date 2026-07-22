import { LearningEntityType } from '../constants/learning.constants';

export interface LearningFilterOptions {
  entityType: LearningEntityType;
  subjectId?: string;
  courseId?: string;
  curriculumId?: string;
  chapterId?: string;
  topicId?: string;
  lessonId?: string;
  search?: string;
  skip?: number;
  take?: number;
}

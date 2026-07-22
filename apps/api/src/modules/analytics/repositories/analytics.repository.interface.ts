import { StudentAnalyticsEntity } from '../domain/entities/student-analytics.entity';
import { SubjectAnalyticsEntity } from '../domain/entities/subject-analytics.entity';
import { TopicAnalyticsEntity } from '../domain/entities/topic-analytics.entity';
import { ChapterAnalyticsEntity } from '../domain/entities/chapter-analytics.entity';
import { TeacherAnalyticsEntity } from '../domain/entities/teacher-analytics.entity';
import { ClassAnalyticsEntity } from '../domain/entities/class-analytics.entity';

export interface IAnalyticsRepository {
  getStudentAnalytics(studentId: string): Promise<StudentAnalyticsEntity>;
  getSubjectAnalytics(studentId: string, subjectId: string): Promise<SubjectAnalyticsEntity>;
  getTopicAnalytics(topicId: string): Promise<TopicAnalyticsEntity>;
  getChapterAnalytics(chapterId: string): Promise<ChapterAnalyticsEntity>;
  getTeacherAnalytics(teacherId: string): Promise<TeacherAnalyticsEntity>;
  getClassAnalytics(batchId: string): Promise<ClassAnalyticsEntity>;
}

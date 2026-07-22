import { StudentAnalyticsEntity } from '../../domain/entities/student-analytics.entity';
import { SubjectAnalyticsEntity } from '../../domain/entities/subject-analytics.entity';
import { TopicAnalyticsEntity } from '../../domain/entities/topic-analytics.entity';
import { ChapterAnalyticsEntity } from '../../domain/entities/chapter-analytics.entity';
import { TeacherAnalyticsEntity } from '../../domain/entities/teacher-analytics.entity';
import { ClassAnalyticsEntity } from '../../domain/entities/class-analytics.entity';

import {
  StudentAnalyticsResponseDto,
  SubjectAnalyticsResponseDto,
  TopicAnalyticsResponseDto,
  ChapterAnalyticsResponseDto,
  TeacherAnalyticsResponseDto,
  ClassAnalyticsResponseDto,
} from '../dtos/analytics-response.dto';
import { RiskLevel } from '../../constants/analytics.constants';

export class AnalyticsMapper {
  static toStudentDto(entity: StudentAnalyticsEntity): StudentAnalyticsResponseDto {
    return {
      studentId: entity.studentId,
      overallMasteryScore: entity.overallMasteryScore,
      attendancePercentage: entity.attendancePercentage,
      assignmentCompletion: entity.assignmentCompletion,
      learningVelocity: entity.learningVelocity,
      retentionScore: entity.retentionScore,
      studyTimeMins: entity.studyTimeMins,
      riskLevel: entity.riskLevel as RiskLevel,
      weakTopics: entity.weakTopics,
      strongTopics: entity.strongTopics,
      heatmapData: entity.heatmapData,
    };
  }

  static toSubjectDto(entity: SubjectAnalyticsEntity): SubjectAnalyticsResponseDto {
    return {
      subjectId: entity.subjectId,
      subjectName: entity.subjectName,
      averageMastery: entity.averageMastery,
      totalChapters: entity.totalChapters,
      completedChapters: entity.completedChapters,
      quizzesTaken: entity.quizzesTaken,
      averageQuizScore: entity.averageQuizScore,
    };
  }

  static toTopicDto(entity: TopicAnalyticsEntity): TopicAnalyticsResponseDto {
    return {
      topicId: entity.topicId,
      title: entity.title,
      comprehensionRate: entity.comprehensionRate,
      averageTimeSpentMins: entity.averageTimeSpentMins,
      difficultyIndex: entity.difficultyIndex,
      totalAttempts: entity.totalAttempts,
    };
  }

  static toChapterDto(entity: ChapterAnalyticsEntity): ChapterAnalyticsResponseDto {
    return {
      chapterId: entity.chapterId,
      title: entity.title,
      completionPercentage: entity.completionPercentage,
      totalTopics: entity.totalTopics,
      completedTopics: entity.completedTopics,
      averageAssessmentScore: entity.averageAssessmentScore,
    };
  }

  static toTeacherDto(entity: TeacherAnalyticsEntity): TeacherAnalyticsResponseDto {
    return {
      teacherId: entity.teacherId,
      totalBatches: entity.totalBatches,
      totalStudents: entity.totalStudents,
      averageClassAttendance: entity.averageClassAttendance,
      averageClassScore: entity.averageClassScore,
      assignmentsSubmissionRate: entity.assignmentsSubmissionRate,
    };
  }

  static toClassDto(entity: ClassAnalyticsEntity): ClassAnalyticsResponseDto {
    return {
      batchId: entity.batchId,
      batchName: entity.batchName,
      totalStudents: entity.totalStudents,
      averageAttendancePercentage: entity.averageAttendancePercentage,
      averageAssessmentScore: entity.averageAssessmentScore,
      assignmentCompletionPercentage: entity.assignmentCompletionPercentage,
      atRiskStudentsCount: entity.atRiskStudentsCount,
    };
  }
}

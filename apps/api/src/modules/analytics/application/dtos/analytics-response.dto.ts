import { RiskLevel } from '../../constants/analytics.constants';
import { HeatmapPoint } from '../../types/analytics.types';

export class StudentAnalyticsResponseDto {
  studentId!: string;
  overallMasteryScore!: number;
  attendancePercentage!: number;
  assignmentCompletion!: number;
  learningVelocity!: number;
  retentionScore!: number;
  studyTimeMins!: number;
  riskLevel!: RiskLevel;
  weakTopics!: string[];
  strongTopics!: string[];
  heatmapData?: HeatmapPoint[];
}

export class SubjectAnalyticsResponseDto {
  subjectId!: string;
  subjectName!: string;
  averageMastery!: number;
  totalChapters!: number;
  completedChapters!: number;
  quizzesTaken!: number;
  averageQuizScore!: number;
}

export class TopicAnalyticsResponseDto {
  topicId!: string;
  title!: string;
  comprehensionRate!: number;
  averageTimeSpentMins!: number;
  difficultyIndex!: number;
  totalAttempts!: number;
}

export class ChapterAnalyticsResponseDto {
  chapterId!: string;
  title!: string;
  completionPercentage!: number;
  totalTopics!: number;
  completedTopics!: number;
  averageAssessmentScore!: number;
}

export class TeacherAnalyticsResponseDto {
  teacherId!: string;
  totalBatches!: number;
  totalStudents!: number;
  averageClassAttendance!: number;
  averageClassScore!: number;
  assignmentsSubmissionRate!: number;
}

export class ClassAnalyticsResponseDto {
  batchId!: string;
  batchName!: string;
  totalStudents!: number;
  averageAttendancePercentage!: number;
  averageAssessmentScore!: number;
  assignmentCompletionPercentage!: number;
  atRiskStudentsCount!: number;
}

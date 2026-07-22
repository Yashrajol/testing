import { RiskLevel, TimeFrame } from '../constants/analytics.constants';

export interface HeatmapPoint {
  day: string;
  hour: number;
  intensity: number;
}

export interface TopicPerformance {
  topicId: string;
  topicTitle: string;
  masteryPercentage: number;
  quizzesAttempted: number;
  averageScore: number;
}

export interface AnalyticsFilterOptions {
  studentId?: string;
  batchId?: string;
  subjectId?: string;
  timeFrame?: TimeFrame;
}

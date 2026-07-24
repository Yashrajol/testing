export interface KPI {
  id: string;
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  period?: string;
}

export interface AttendanceTrend {
  period: string; // e.g. "Week 1", "Jan"
  present: number;
  absent: number;
  late: number;
  percentage: number;
}

export interface AssignmentTrend {
  subject: string;
  completed: number;
  pending: number;
  avgScore: number;
}

export interface AssessmentTrend {
  subject: string;
  score: number;
  percentile: number;
  benchmark: number;
  date?: string;
}

export interface LearningDNATrend {
  dimension: string; // e.g. "Logical Reasoning", "Spatial Aptitude"
  score: number;
  category: string;
}

export interface GrowthTrend {
  month: string;
  academics: number;
  skills: number;
  attendance: number;
  overall: number;
}

export interface RevenueTrend {
  month: string;
  mrr: number;
  users: number;
  churn?: number;
}

export interface PlatformMetrics {
  totalUsers: number;
  activeSchools: number;
  totalAssessmentsTaken: number;
  totalSessionsCompleted: number;
  avgEngagementScore: number;
}

export interface AnalyticsSummary {
  kpis: KPI[];
  attendanceTrends?: AttendanceTrend[];
  assignmentTrends?: AssignmentTrend[];
  assessmentTrends?: AssessmentTrend[];
  learningDNATrends?: LearningDNATrend[];
  growthTrends?: GrowthTrend[];
  revenueTrends?: RevenueTrend[];
  platformMetrics?: PlatformMetrics;
}

export interface ReportItem {
  id: string;
  title: string;
  category: string;
  generatedDate: string;
  format: 'PDF' | 'Excel' | 'CSV';
  size: string;
  downloadUrl?: string;
  author?: string;
}

export interface ExportRequest {
  reportId?: string;
  reportType: 'student' | 'parent' | 'mentor' | 'admin' | 'platform' | 'financial' | 'assessment';
  format: 'pdf' | 'excel' | 'csv' | 'print';
  dateRange?: { startDate: string; endDate: string };
  filters?: Record<string, any>;
}

export interface ExportResult {
  success: boolean;
  fileUrl?: string;
  fileName?: string;
  format: string;
  exportedAt: string;
  message?: string;
}

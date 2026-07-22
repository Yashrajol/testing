import { DashboardRole, ReportType, ExportFormat, ExportStatus } from '../constants/reporting.constants';

export interface DashboardMetricsQuery {
  role: DashboardRole;
  entityId: string; // studentId, teacherId, parentId, schoolId, organizationId
  startDate?: Date;
  endDate?: Date;
}

export interface StudentDashboardMetrics {
  learningProgress: number;
  attendancePercentage: number;
  assignmentCompletionRate: number;
  assessmentAverageScore: number;
  learningDnaTraits: Record<string, any>;
  vedhkritIndexScore: number;
  careerReadinessScore: number;
  competencyRadar: Array<{ skill: string; mastery: number }>;
  recommendations: string[];
}

export interface TeacherDashboardMetrics {
  classPerformanceScore: number;
  weakStudentsCount: number;
  weakStudentsList: Array<{ id: string; name: string; riskLevel: string }>;
  assignmentSubmissionRate: number;
  assessmentPassRate: number;
  attendanceAvg: number;
  topicMasteryHeatmap: Array<{ topic: string; masteryPercent: number }>;
}

export interface ParentDashboardMetrics {
  childId: string;
  childName: string;
  attendancePercentage: number;
  pendingAssignmentsCount: number;
  overallMastery: number;
  growthVelocity: number;
  alerts: Array<{ type: string; message: string; date: Date }>;
}

export interface SchoolAdminDashboardMetrics {
  totalStudents: number;
  totalTeachers: number;
  schoolAttendanceRate: number;
  assessmentTrend: Array<{ date: string; avgScore: number }>;
  assignmentCompletionTrend: Array<{ date: string; rate: number }>;
  teacherPerformanceIndex: number;
  departmentAnalytics: Array<{ department: string; score: number }>;
}

export interface OrganizationDashboardMetrics {
  totalSchools: number;
  multiSchoolAttendanceAvg: number;
  academicKpis: Record<string, number>;
  growthKpis: Record<string, number>;
  operationalKpis: Record<string, number>;
}

export interface SuperAdminDashboardMetrics {
  platformUsage: { activeUsers: number; totalSessions: number };
  activeOrganizations: number;
  activeSchools: number;
  userGrowth: Array<{ month: string; users: number }>;
  apiMetrics: { totalRequests: number; avgLatencyMs: number };
  errorRates: { "4xxRate": number; "5xxRate": number };
  systemHealth: string;
}

export interface ReportFilterOptions {
  organizationId?: string;
  tenantId?: string;
  authorId?: string;
  type?: ReportType;
  skip?: number;
  take?: number;
}

export interface ExportJobOptions {
  organizationId?: string;
  tenantId?: string;
  reportId?: string;
  reportType: ReportType;
  format: ExportFormat;
  requestedBy: string;
}

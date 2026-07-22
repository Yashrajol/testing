import { AttendanceStatus, AttendanceMode, AttendanceType, LeaveStatus, LeaveType, HolidayType } from '../constants/attendance.constants';

export interface AttendanceFilterOptions {
  organizationId?: string;
  tenantId?: string;
  studentId?: string;
  teacherId?: string;
  batchId?: string;
  classId?: string;
  subjectId?: string;
  type?: AttendanceType;
  status?: AttendanceStatus;
  mode?: AttendanceMode;
  startDate?: Date;
  endDate?: Date;
  skip?: number;
  take?: number;
}

export interface LeaveFilterOptions {
  organizationId?: string;
  tenantId?: string;
  applicantId?: string;
  applicantType?: 'STUDENT' | 'TEACHER';
  status?: LeaveStatus;
  leaveType?: LeaveType;
  startDate?: Date;
  endDate?: Date;
  skip?: number;
  take?: number;
}

export interface HolidayFilterOptions {
  organizationId?: string;
  tenantId?: string;
  type?: HolidayType;
  year?: number;
  month?: number;
  startDate?: Date;
  endDate?: Date;
  skip?: number;
  take?: number;
}

export interface AttendanceSummaryMetrics {
  totalSessions: number;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  halfDayCount: number;
  leaveCount: number;
  excusedCount: number;
  percentage: number;
  consecutiveAbsences: number;
  isDefaulter: boolean;
}

export interface HeatmapCell {
  date: string;
  status: AttendanceStatus;
  percentage?: number;
}

export interface DefaulterItem {
  studentId: string;
  studentName?: string;
  batchId?: string;
  classId?: string;
  attendancePercentage: number;
  totalClasses: number;
  attendedClasses: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

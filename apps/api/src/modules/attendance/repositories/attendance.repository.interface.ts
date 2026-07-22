import { AttendanceFilterOptions, LeaveFilterOptions, HolidayFilterOptions } from '../types/attendance.types';
import { AttendanceSessionEntity } from '../domain/entities/attendance-session.entity';
import { AttendanceRecordEntity } from '../domain/entities/attendance-record.entity';
import { LeaveRequestEntity } from '../domain/entities/leave-request.entity';
import { HolidayEntity } from '../domain/entities/holiday.entity';
import { AttendancePolicyEntity } from '../domain/entities/attendance-policy.entity';
import { AttendanceAnalyticsEntity } from '../domain/entities/attendance-analytics.entity';

export interface IAttendanceRepository {
  createSession(data: any): Promise<AttendanceSessionEntity>;
  findSessionById(id: string): Promise<AttendanceSessionEntity | null>;
  closeSession(id: string): Promise<AttendanceSessionEntity>;

  markRecord(data: any): Promise<AttendanceRecordEntity>;
  correctRecord(id: string, data: any): Promise<AttendanceRecordEntity>;
  findRecordById(id: string): Promise<AttendanceRecordEntity | null>;
  markBulkRecords(records: any[]): Promise<AttendanceRecordEntity[]>;
  findRecords(options: AttendanceFilterOptions): Promise<{ items: AttendanceRecordEntity[]; total: number }>;

  createLeaveRequest(data: any): Promise<LeaveRequestEntity>;
  findLeaveById(id: string): Promise<LeaveRequestEntity | null>;
  updateLeaveStatus(id: string, status: string, approvedBy?: string, rejectionReason?: string): Promise<LeaveRequestEntity>;
  findLeaveRequests(options: LeaveFilterOptions): Promise<{ items: LeaveRequestEntity[]; total: number }>;

  createHoliday(data: any): Promise<HolidayEntity>;
  updateHoliday(id: string, data: any): Promise<HolidayEntity>;
  deleteHoliday(id: string): Promise<void>;
  findHolidays(options: HolidayFilterOptions): Promise<HolidayEntity[]>;

  createPolicy(data: any): Promise<AttendancePolicyEntity>;
  findPolicy(organizationId?: string): Promise<AttendancePolicyEntity | null>;

  upsertAnalytics(studentId: string, period: string, data: any): Promise<AttendanceAnalyticsEntity>;
  findAnalytics(studentId: string, period: string): Promise<AttendanceAnalyticsEntity | null>;
}

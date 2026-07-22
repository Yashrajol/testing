import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AttendanceStatus, AttendanceMode, AttendanceType, LeaveStatus, LeaveType, HolidayType } from '../../constants/attendance.constants';

export class AttendanceRecordResponseDto {
  @ApiProperty({ example: 'record-uuid-123' })
  id!: string;

  @ApiPropertyOptional({ example: 'session-uuid-123' })
  sessionId?: string | null;

  @ApiPropertyOptional({ example: 'student-uuid-123' })
  studentId?: string | null;

  @ApiPropertyOptional({ example: 'teacher-uuid-123' })
  teacherId?: string | null;

  @ApiPropertyOptional({ example: 'batch-uuid-123' })
  batchId?: string | null;

  @ApiPropertyOptional({ example: 'class-uuid-123' })
  classId?: string | null;

  @ApiPropertyOptional({ example: 'subject-uuid-123' })
  subjectId?: string | null;

  @ApiProperty({ enum: AttendanceType, example: AttendanceType.DAILY })
  type!: AttendanceType;

  @ApiProperty({ enum: AttendanceStatus, example: AttendanceStatus.PRESENT })
  status!: AttendanceStatus;

  @ApiProperty({ enum: AttendanceMode, example: AttendanceMode.MANUAL })
  mode!: AttendanceMode;

  @ApiProperty({ example: '2026-07-21T00:00:00.000Z' })
  date!: Date;

  @ApiProperty({ example: '2026-07-21T09:15:00.000Z' })
  markedAt!: Date;

  @ApiPropertyOptional({ example: 'Marked by Class Teacher' })
  remarks?: string | null;

  @ApiPropertyOptional({ example: false })
  isCorrected?: boolean;

  @ApiPropertyOptional({ example: 'Corrected after verification' })
  correctionReason?: string | null;
}

export class AttendanceSessionResponseDto {
  @ApiProperty({ example: 'session-uuid-123' })
  id!: string;

  @ApiProperty({ example: 'Morning Attendance' })
  title!: string;

  @ApiProperty({ enum: AttendanceType, example: AttendanceType.DAILY })
  type!: AttendanceType;

  @ApiPropertyOptional({ example: 'batch-uuid-123' })
  batchId?: string | null;

  @ApiProperty({ example: '2026-07-21T00:00:00.000Z' })
  date!: Date;

  @ApiProperty({ example: 'OPEN' })
  status!: string;

  @ApiPropertyOptional({ example: 'qr-token-string' })
  qrCode?: string | null;

  @ApiProperty({ type: [AttendanceRecordResponseDto] })
  records?: AttendanceRecordResponseDto[];
}

export class LeaveRequestResponseDto {
  @ApiProperty({ example: 'leave-uuid-123' })
  id!: string;

  @ApiProperty({ example: 'applicant-uuid-123' })
  applicantId!: string;

  @ApiProperty({ example: 'STUDENT' })
  applicantType!: string;

  @ApiProperty({ enum: LeaveType, example: LeaveType.CASUAL })
  leaveType!: LeaveType;

  @ApiProperty({ example: '2026-08-01T00:00:00.000Z' })
  startDate!: Date;

  @ApiProperty({ example: '2026-08-03T00:00:00.000Z' })
  endDate!: Date;

  @ApiProperty({ example: 3.0 })
  totalDays!: number;

  @ApiProperty({ example: 'Family function' })
  reason!: string;

  @ApiProperty({ enum: LeaveStatus, example: LeaveStatus.PENDING })
  status!: LeaveStatus;

  @ApiPropertyOptional({ example: 'Approved by Principal' })
  rejectionReason?: string | null;
}

export class HolidayResponseDto {
  @ApiProperty({ example: 'holiday-uuid-123' })
  id!: string;

  @ApiProperty({ example: 'Independence Day' })
  title!: string;

  @ApiPropertyOptional({ example: 'National holiday' })
  description?: string | null;

  @ApiProperty({ example: '2026-08-15T00:00:00.000Z' })
  date!: Date;

  @ApiProperty({ enum: HolidayType, example: HolidayType.NATIONAL })
  type!: HolidayType;

  @ApiProperty({ example: true })
  isRecurring!: boolean;
}

export class AttendanceSummaryResponseDto {
  @ApiProperty({ example: 'student-uuid-123' })
  studentId!: string;

  @ApiProperty({ example: 94.5 })
  attendancePercentage!: number;

  @ApiProperty({ example: 120 })
  totalSessions!: number;

  @ApiProperty({ example: 110 })
  presentCount!: number;

  @ApiProperty({ example: 4 })
  absentCount!: number;

  @ApiProperty({ example: 3 })
  lateCount!: number;

  @ApiProperty({ example: 1 })
  halfDayCount!: number;

  @ApiProperty({ example: 2 })
  leaveCount!: number;

  @ApiProperty({ example: 0 })
  consecutiveAbsences!: number;

  @ApiProperty({ example: false })
  isDefaulter!: boolean;
}

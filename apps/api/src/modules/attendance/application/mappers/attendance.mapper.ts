import { AttendanceRecordEntity } from '../../domain/entities/attendance-record.entity';
import { AttendanceSessionEntity } from '../../domain/entities/attendance-session.entity';
import { LeaveRequestEntity } from '../../domain/entities/leave-request.entity';
import { HolidayEntity } from '../../domain/entities/holiday.entity';
import { AttendanceAnalyticsEntity } from '../../domain/entities/attendance-analytics.entity';
import {
  AttendanceRecordResponseDto,
  AttendanceSessionResponseDto,
  LeaveRequestResponseDto,
  HolidayResponseDto,
  AttendanceSummaryResponseDto,
} from '../dtos/attendance-response.dto';
import { AttendanceStatus, AttendanceMode, AttendanceType, LeaveStatus, HolidayType } from '../../constants/attendance.constants';

export class AttendanceMapper {
  static toRecordDto(entity: AttendanceRecordEntity): AttendanceRecordResponseDto {
    return {
      id: entity.id,
      sessionId: entity.sessionId || null,
      studentId: entity.studentId || null,
      teacherId: entity.teacherId || null,
      batchId: entity.batchId || null,
      classId: entity.classId || null,
      subjectId: entity.subjectId || null,
      type: entity.type || AttendanceType.DAILY,
      status: entity.status as AttendanceStatus,
      mode: entity.mode as AttendanceMode,
      date: entity.date,
      markedAt: entity.markedAt,
      remarks: entity.remarks || null,
      isCorrected: entity.isCorrected,
      correctionReason: entity.correctionReason || null,
    };
  }

  static toSessionDto(entity: AttendanceSessionEntity, records: AttendanceRecordEntity[] = []): AttendanceSessionResponseDto {
    return {
      id: entity.id,
      title: entity.title,
      type: entity.type,
      batchId: entity.batchId || null,
      date: entity.date,
      status: entity.status as string,
      qrCode: entity.qrCode || null,
      records: records.map((r) => AttendanceMapper.toRecordDto(r)),
    };
  }

  static toLeaveDto(entity: LeaveRequestEntity): LeaveRequestResponseDto {
    return {
      id: entity.id,
      applicantId: entity.applicantId,
      applicantType: entity.applicantType,
      leaveType: entity.leaveType || LeaveStatus.PENDING,
      startDate: entity.startDate,
      endDate: entity.endDate,
      totalDays: entity.totalDays,
      reason: entity.reason,
      status: entity.status as LeaveStatus,
      rejectionReason: entity.rejectionReason || null,
    };
  }

  static toHolidayDto(entity: HolidayEntity): HolidayResponseDto {
    return {
      id: entity.id,
      title: entity.title,
      description: entity.description || null,
      date: entity.date,
      type: entity.type as HolidayType,
      isRecurring: entity.isRecurring,
    };
  }

  static toSummaryDto(entity: AttendanceAnalyticsEntity): AttendanceSummaryResponseDto {
    return {
      studentId: entity.studentId || '',
      attendancePercentage: entity.attendancePercentage,
      totalSessions: entity.totalDays,
      presentCount: entity.presentDays,
      absentCount: entity.absentDays,
      lateCount: entity.lateDays,
      halfDayCount: entity.halfDays,
      leaveCount: entity.leaveDays,
      consecutiveAbsences: entity.consecutiveAbsences,
      isDefaulter: entity.isDefaulter,
    };
  }
}

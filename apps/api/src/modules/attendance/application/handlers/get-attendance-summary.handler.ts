import { Injectable, Inject } from '@nestjs/common';
import { ATTENDANCE_REPOSITORY_TOKEN } from '../../constants/attendance.constants';
import { IAttendanceRepository } from '../../repositories/attendance.repository.interface';
import { GetAttendanceSummaryQuery } from '../queries/get-attendance-summary.query';
import { AttendanceSummaryResponseDto } from '../dtos/attendance-response.dto';
import { AttendanceAnalyticsEntity } from '../../domain/entities/attendance-analytics.entity';
import { AttendanceMapper } from '../mappers/attendance.mapper';
import { AttendanceAnalyticsService } from '../services/attendance-analytics.service';

@Injectable()
export class GetAttendanceSummaryHandler {
  constructor(
    @Inject(ATTENDANCE_REPOSITORY_TOKEN)
    private readonly repo: IAttendanceRepository,
    private readonly analyticsService: AttendanceAnalyticsService,
  ) {}

  async execute(query: GetAttendanceSummaryQuery): Promise<AttendanceSummaryResponseDto> {
    const { items } = await this.repo.findRecords({
      studentId: query.studentId,
      startDate: query.startDate,
      endDate: query.endDate,
      take: 1000,
    });

    const metrics = this.analyticsService.calculateMetrics(items);

    const entity = new AttendanceAnalyticsEntity({
      id: `summary-${query.studentId}`,
      studentId: query.studentId,
      period: new Date().toISOString().substring(0, 7),
      totalDays: metrics.totalSessions,
      presentDays: metrics.presentCount,
      absentDays: metrics.absentCount,
      lateDays: metrics.lateCount,
      halfDays: metrics.halfDayCount,
      leaveDays: metrics.leaveCount,
      attendancePercentage: metrics.percentage,
      consecutiveAbsences: metrics.consecutiveAbsences,
      isDefaulter: metrics.isDefaulter,
      riskScore: metrics.isDefaulter ? 80.0 : 10.0,
      lastCalculatedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return AttendanceMapper.toSummaryDto(entity);
  }
}

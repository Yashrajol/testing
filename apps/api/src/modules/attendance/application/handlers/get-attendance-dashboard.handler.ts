import { Injectable, Inject } from '@nestjs/common';
import { ATTENDANCE_REPOSITORY_TOKEN } from '../../constants/attendance.constants';
import { IAttendanceRepository } from '../../repositories/attendance.repository.interface';
import { GetAttendanceDashboardQuery } from '../queries/get-attendance-dashboard.query';
import { AttendanceDashboardResponseDto } from '../dtos/analytics-dto';
import { AttendanceAnalyticsService } from '../services/attendance-analytics.service';

@Injectable()
export class GetAttendanceDashboardHandler {
  constructor(
    @Inject(ATTENDANCE_REPOSITORY_TOKEN)
    private readonly repo: IAttendanceRepository,
    private readonly analyticsService: AttendanceAnalyticsService,
  ) {}

  async execute(query: GetAttendanceDashboardQuery): Promise<AttendanceDashboardResponseDto> {
    const period = query.period || new Date().toISOString().substring(0, 7);
    const { items } = await this.repo.findRecords({
      organizationId: query.organizationId,
      batchId: query.batchId,
      take: 500,
    });

    const metrics = this.analyticsService.calculateMetrics(items);

    return {
      period,
      overallPercentage: metrics.percentage,
      totalStudents: metrics.totalSessions,
      presentToday: metrics.presentCount,
      absentToday: metrics.absentCount,
      lateToday: metrics.lateCount,
      onLeaveToday: metrics.leaveCount,
      defaultersCount: metrics.isDefaulter ? 1 : 0,
      trend: [
        { date: new Date().toISOString().split('T')[0], percentage: metrics.percentage },
      ],
    };
  }
}

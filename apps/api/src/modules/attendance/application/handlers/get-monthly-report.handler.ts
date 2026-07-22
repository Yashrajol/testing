import { Injectable, Inject } from '@nestjs/common';
import { ATTENDANCE_REPOSITORY_TOKEN } from '../../constants/attendance.constants';
import { IAttendanceRepository } from '../../repositories/attendance.repository.interface';
import { GetMonthlyReportQuery } from '../queries/get-monthly-report.query';
import { AttendanceSummaryResponseDto } from '../dtos/attendance-response.dto';
import { AttendanceAnalyticsService } from '../services/attendance-analytics.service';

@Injectable()
export class GetMonthlyReportHandler {
  constructor(
    @Inject(ATTENDANCE_REPOSITORY_TOKEN)
    private readonly repo: IAttendanceRepository,
    private readonly analyticsService: AttendanceAnalyticsService,
  ) {}

  async execute(query: GetMonthlyReportQuery): Promise<AttendanceSummaryResponseDto[]> {
    const startDate = new Date(query.year, query.month - 1, 1);
    const endDate = new Date(query.year, query.month, 0);

    const { items } = await this.repo.findRecords({
      batchId: query.batchId,
      startDate,
      endDate,
      take: 1000,
    });

    const studentRecordsMap = new Map<string, any[]>();
    for (const record of items) {
      if (record.studentId) {
        const list = studentRecordsMap.get(record.studentId) || [];
        list.push(record);
        studentRecordsMap.set(record.studentId, list);
      }
    }

    const summaries: AttendanceSummaryResponseDto[] = [];
    studentRecordsMap.forEach((records, studentId) => {
      const metrics = this.analyticsService.calculateMetrics(records);
      summaries.push({
        studentId,
        attendancePercentage: metrics.percentage,
        totalSessions: metrics.totalSessions,
        presentCount: metrics.presentCount,
        absentCount: metrics.absentCount,
        lateCount: metrics.lateCount,
        halfDayCount: metrics.halfDayCount,
        leaveCount: metrics.leaveCount,
        consecutiveAbsences: metrics.consecutiveAbsences,
        isDefaulter: metrics.isDefaulter,
      });
    });

    return summaries;
  }
}

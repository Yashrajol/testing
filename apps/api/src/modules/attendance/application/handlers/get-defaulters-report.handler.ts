import { Injectable, Inject } from '@nestjs/common';
import { ATTENDANCE_REPOSITORY_TOKEN } from '../../constants/attendance.constants';
import { IAttendanceRepository } from '../../repositories/attendance.repository.interface';
import { GetDefaultersReportQuery } from '../queries/get-defaulters-report.query';
import { DefaulterReportResponseDto } from '../dtos/analytics-dto';
import { AttendanceAnalyticsService } from '../services/attendance-analytics.service';
import { AttendanceRecordEntity } from '../../domain/entities/attendance-record.entity';

@Injectable()
export class GetDefaultersReportHandler {
  constructor(
    @Inject(ATTENDANCE_REPOSITORY_TOKEN)
    private readonly repo: IAttendanceRepository,
    private readonly analyticsService: AttendanceAnalyticsService,
  ) {}

  async execute(query: GetDefaultersReportQuery): Promise<DefaulterReportResponseDto> {
    const { items } = await this.repo.findRecords({
      batchId: query.batchId,
      classId: query.classId,
      take: 1000,
    });

    const studentRecordsMap = new Map<string, AttendanceRecordEntity[]>();
    for (const record of items) {
      if (record.studentId) {
        const list = studentRecordsMap.get(record.studentId) || [];
        list.push(record);
        studentRecordsMap.set(record.studentId, list);
      }
    }

    const defaulters = this.analyticsService.detectDefaulters(studentRecordsMap, query.thresholdPercentage);

    return {
      batchId: query.batchId,
      thresholdPercentage: query.thresholdPercentage,
      totalDefaulters: defaulters.length,
      defaulters,
    };
  }
}

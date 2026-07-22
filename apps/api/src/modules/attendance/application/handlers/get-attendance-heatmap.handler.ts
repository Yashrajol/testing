import { Injectable, Inject } from '@nestjs/common';
import { ATTENDANCE_REPOSITORY_TOKEN } from '../../constants/attendance.constants';
import { IAttendanceRepository } from '../../repositories/attendance.repository.interface';
import { GetAttendanceHeatmapQuery } from '../queries/get-attendance-heatmap.query';
import { AttendanceHeatmapResponseDto } from '../dtos/analytics-dto';
import { AttendanceAnalyticsService } from '../services/attendance-analytics.service';

@Injectable()
export class GetAttendanceHeatmapHandler {
  constructor(
    @Inject(ATTENDANCE_REPOSITORY_TOKEN)
    private readonly repo: IAttendanceRepository,
    private readonly analyticsService: AttendanceAnalyticsService,
  ) {}

  async execute(query: GetAttendanceHeatmapQuery): Promise<AttendanceHeatmapResponseDto> {
    const { items } = await this.repo.findRecords({
      studentId: query.entityId,
      take: 100,
    });

    const cells = this.analyticsService.generateHeatmap(items);

    return {
      entityId: query.entityId,
      period: query.period,
      cells,
    };
  }
}

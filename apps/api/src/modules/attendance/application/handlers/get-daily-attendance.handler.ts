import { Injectable, Inject } from '@nestjs/common';
import { ATTENDANCE_REPOSITORY_TOKEN } from '../../constants/attendance.constants';
import { IAttendanceRepository } from '../../repositories/attendance.repository.interface';
import { GetDailyAttendanceQuery } from '../queries/get-daily-attendance.query';
import { AttendanceRecordResponseDto } from '../dtos/attendance-response.dto';
import { AttendanceMapper } from '../mappers/attendance.mapper';

@Injectable()
export class GetDailyAttendanceHandler {
  constructor(
    @Inject(ATTENDANCE_REPOSITORY_TOKEN)
    private readonly repo: IAttendanceRepository,
  ) {}

  async execute(query: GetDailyAttendanceQuery): Promise<AttendanceRecordResponseDto[]> {
    const start = new Date(query.date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(query.date);
    end.setHours(23, 59, 59, 999);

    const { items } = await this.repo.findRecords({
      batchId: query.batchId,
      startDate: start,
      endDate: end,
      take: 500,
    });

    return items.map((rec) => AttendanceMapper.toRecordDto(rec));
  }
}

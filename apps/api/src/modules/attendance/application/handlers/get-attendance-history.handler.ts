import { Injectable, Inject } from '@nestjs/common';
import { ATTENDANCE_REPOSITORY_TOKEN } from '../../constants/attendance.constants';
import { IAttendanceRepository } from '../../repositories/attendance.repository.interface';
import { GetAttendanceHistoryQuery } from '../queries/get-attendance-history.query';
import { AttendanceRecordResponseDto } from '../dtos/attendance-response.dto';
import { AttendanceMapper } from '../mappers/attendance.mapper';

@Injectable()
export class GetAttendanceHistoryHandler {
  constructor(
    @Inject(ATTENDANCE_REPOSITORY_TOKEN)
    private readonly repo: IAttendanceRepository,
  ) {}

  async execute(query: GetAttendanceHistoryQuery): Promise<{ items: AttendanceRecordResponseDto[]; total: number }> {
    const { items, total } = await this.repo.findRecords(query.options);
    return {
      items: items.map((rec) => AttendanceMapper.toRecordDto(rec)),
      total,
    };
  }
}

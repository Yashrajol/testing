import { Injectable, Inject } from '@nestjs/common';
import { ATTENDANCE_REPOSITORY_TOKEN } from '../../constants/attendance.constants';
import { IAttendanceRepository } from '../../repositories/attendance.repository.interface';
import { GetClassAttendanceQuery } from '../queries/get-class-attendance.query';
import { AttendanceRecordResponseDto } from '../dtos/attendance-response.dto';
import { AttendanceMapper } from '../mappers/attendance.mapper';

@Injectable()
export class GetClassAttendanceHandler {
  constructor(
    @Inject(ATTENDANCE_REPOSITORY_TOKEN)
    private readonly repo: IAttendanceRepository,
  ) {}

  async execute(query: GetClassAttendanceQuery): Promise<AttendanceRecordResponseDto[]> {
    const { items } = await this.repo.findRecords({
      classId: query.classId,
      startDate: query.date,
      endDate: query.date,
      take: 200,
    });
    return items.map((r) => AttendanceMapper.toRecordDto(r));
  }
}

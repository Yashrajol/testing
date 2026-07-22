import { Injectable, Inject } from '@nestjs/common';
import { ATTENDANCE_REPOSITORY_TOKEN } from '../../constants/attendance.constants';
import { IAttendanceRepository } from '../../repositories/attendance.repository.interface';
import { GetStudentAttendanceQuery } from '../queries/get-student-attendance.query';
import { AttendanceRecordResponseDto } from '../dtos/attendance-response.dto';
import { AttendanceMapper } from '../mappers/attendance.mapper';

@Injectable()
export class GetStudentAttendanceHandler {
  constructor(
    @Inject(ATTENDANCE_REPOSITORY_TOKEN)
    private readonly repo: IAttendanceRepository,
  ) {}

  async execute(query: GetStudentAttendanceQuery): Promise<AttendanceRecordResponseDto[]> {
    const { items } = await this.repo.findRecords({
      studentId: query.studentId,
      startDate: query.startDate,
      endDate: query.endDate,
      take: 100,
    });
    return items.map((r) => AttendanceMapper.toRecordDto(r));
  }
}

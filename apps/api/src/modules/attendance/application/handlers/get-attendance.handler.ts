import { Injectable, Inject } from '@nestjs/common';
import { ATTENDANCE_REPOSITORY_TOKEN } from '../../constants/attendance.constants';
import { IAttendanceRepository } from '../../repositories/attendance.repository.interface';
import { GetAttendanceQuery } from '../queries/get-attendance.query';
import { AttendanceRecordResponseDto } from '../dtos/attendance-response.dto';
import { AttendanceMapper } from '../mappers/attendance.mapper';
import { AttendanceNotFoundException } from '../../domain/exceptions/attendance-exceptions';

@Injectable()
export class GetAttendanceHandler {
  constructor(
    @Inject(ATTENDANCE_REPOSITORY_TOKEN)
    private readonly repo: IAttendanceRepository,
  ) {}

  async execute(query: GetAttendanceQuery): Promise<AttendanceRecordResponseDto> {
    const record = await this.repo.findRecordById(query.recordId);
    if (!record) {
      throw new AttendanceNotFoundException(query.recordId);
    }
    return AttendanceMapper.toRecordDto(record);
  }
}

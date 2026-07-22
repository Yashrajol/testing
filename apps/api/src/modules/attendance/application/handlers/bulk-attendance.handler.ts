import { Injectable, Inject } from '@nestjs/common';
import { ATTENDANCE_REPOSITORY_TOKEN, AttendanceMode, AttendanceType } from '../../constants/attendance.constants';
import { IAttendanceRepository } from '../../repositories/attendance.repository.interface';
import { BulkAttendanceCommand } from '../commands/bulk-attendance.command';
import { AttendanceRecordResponseDto } from '../dtos/attendance-response.dto';
import { AttendanceMapper } from '../mappers/attendance.mapper';

@Injectable()
export class BulkAttendanceHandler {
  constructor(
    @Inject(ATTENDANCE_REPOSITORY_TOKEN)
    private readonly repo: IAttendanceRepository,
  ) {}

  async execute(command: BulkAttendanceCommand): Promise<AttendanceRecordResponseDto[]> {
    const records = command.dto.records.map((dto) => ({
      sessionId: dto.sessionId,
      studentId: dto.studentId,
      teacherId: dto.teacherId,
      batchId: dto.batchId,
      classId: dto.classId,
      subjectId: dto.subjectId,
      type: dto.type || AttendanceType.DAILY,
      date: dto.date ? new Date(dto.date) : new Date(),
      status: dto.status,
      mode: dto.mode || AttendanceMode.MANUAL,
      markedById: command.markedById,
      locationLat: dto.locationLat,
      locationLng: dto.locationLng,
      remarks: dto.remarks,
      markedAt: new Date(),
    }));

    const created = await this.repo.markBulkRecords(records);
    return created.map((rec) => AttendanceMapper.toRecordDto(rec));
  }
}

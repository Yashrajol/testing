import { Injectable, Inject } from '@nestjs/common';
import { ATTENDANCE_REPOSITORY_TOKEN } from '../../constants/attendance.constants';
import { IAttendanceRepository } from '../../repositories/attendance.repository.interface';
import { CorrectAttendanceCommand } from '../commands/correct-attendance.command';
import { AttendanceRecordResponseDto } from '../dtos/attendance-response.dto';
import { AttendanceMapper } from '../mappers/attendance.mapper';
import { AttendanceCorrectedEvent } from '../../domain/events/attendance-corrected.event';
import { AttendanceIntegrationService } from '../services/attendance-integration.service';
import { AttendanceNotFoundException } from '../../domain/exceptions/attendance-exceptions';

@Injectable()
export class CorrectAttendanceHandler {
  constructor(
    @Inject(ATTENDANCE_REPOSITORY_TOKEN)
    private readonly repo: IAttendanceRepository,
    private readonly integrationService: AttendanceIntegrationService,
  ) {}

  async execute(command: CorrectAttendanceCommand): Promise<AttendanceRecordResponseDto> {
    const existing = await this.repo.findRecordById(command.recordId);
    if (!existing) {
      throw new AttendanceNotFoundException(command.recordId);
    }

    const previousStatus = existing.status;
    const updated = await this.repo.correctRecord(command.recordId, {
      status: command.dto.status,
      correctedById: command.correctedById,
      correctionReason: command.dto.reason,
      isCorrected: true,
    });

    const event = new AttendanceCorrectedEvent(
      updated.id,
      updated.studentId,
      previousStatus,
      updated.status,
      command.correctedById,
      command.dto.reason,
    );

    await this.integrationService.onAttendanceCorrected(event);

    return AttendanceMapper.toRecordDto(updated);
  }
}

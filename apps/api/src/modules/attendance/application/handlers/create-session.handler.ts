import { Injectable, Inject } from '@nestjs/common';
import { ATTENDANCE_REPOSITORY_TOKEN } from '../../constants/attendance.constants';
import { IAttendanceRepository } from '../../repositories/attendance.repository.interface';
import { CreateSessionCommand } from '../commands/create-session.command';
import { AttendanceSessionResponseDto } from '../dtos/attendance-response.dto';
import { AttendanceMapper } from '../mappers/attendance.mapper';
import { QrAttendanceService } from '../services/qr-attendance.service';

@Injectable()
export class CreateSessionHandler {
  constructor(
    @Inject(ATTENDANCE_REPOSITORY_TOKEN)
    private readonly repo: IAttendanceRepository,
    private readonly qrService: QrAttendanceService,
  ) {}

  async execute(command: CreateSessionCommand): Promise<AttendanceSessionResponseDto> {
    const sessionDate = command.dto.date ? new Date(command.dto.date) : new Date();
    const session = await this.repo.createSession({
      organizationId: command.dto.organizationId,
      tenantId: command.dto.tenantId,
      type: command.dto.type,
      title: command.dto.title,
      batchId: command.dto.batchId,
      subjectId: command.dto.subjectId,
      classId: command.dto.classId,
      teacherId: command.dto.teacherId,
      date: sessionDate,
      startTime: command.dto.startTime ? new Date(command.dto.startTime) : undefined,
      endTime: command.dto.endTime ? new Date(command.dto.endTime) : undefined,
      geofenceLat: command.dto.geofenceLat,
      geofenceLng: command.dto.geofenceLng,
      geofenceRadius: command.dto.geofenceRadius,
      createdById: command.createdById,
      status: 'OPEN',
    });

    const qrCode = this.qrService.generateSessionQrCode(session.id, sessionDate);
    return AttendanceMapper.toSessionDto(session, []);
  }
}

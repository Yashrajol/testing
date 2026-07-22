import { Injectable, Inject } from '@nestjs/common';
import { ATTENDANCE_REPOSITORY_TOKEN, AttendanceMode, AttendanceStatus, AttendanceType } from '../../constants/attendance.constants';
import { IAttendanceRepository } from '../../repositories/attendance.repository.interface';
import { MarkAttendanceCommand } from '../commands/mark-attendance.command';
import { AttendanceRecordResponseDto } from '../dtos/attendance-response.dto';
import { AttendanceMapper } from '../mappers/attendance.mapper';
import { AttendanceMarkedEvent } from '../../domain/events/attendance-marked.event';
import { AttendanceIntegrationService } from '../services/attendance-integration.service';
import { GeofenceVerifierService } from '../services/geofence-verifier.service';
import { QrAttendanceService } from '../services/qr-attendance.service';
import { BiometricIntegrationService } from '../services/biometric-integration.service';
import { GeofenceValidationException, SessionClosedException } from '../../domain/exceptions/attendance-exceptions';

@Injectable()
export class MarkAttendanceHandler {
  constructor(
    @Inject(ATTENDANCE_REPOSITORY_TOKEN)
    private readonly repo: IAttendanceRepository,
    private readonly integrationService: AttendanceIntegrationService,
    private readonly geofenceVerifier: GeofenceVerifierService,
    private readonly qrService: QrAttendanceService,
    private readonly biometricService: BiometricIntegrationService,
  ) {}

  async execute(command: MarkAttendanceCommand): Promise<{ result: AttendanceRecordResponseDto; event: AttendanceMarkedEvent }> {
    let session: any = null;
    if (command.dto.sessionId) {
      session = await this.repo.findSessionById(command.dto.sessionId);
      if (session && !session.isOpen()) {
        throw new SessionClosedException(command.dto.sessionId);
      }

      if (command.dto.mode === AttendanceMode.GEOFENCE && session.geofenceLat && session.geofenceLng) {
        if (command.dto.locationLat == null || command.dto.locationLng == null) {
          throw new GeofenceValidationException('Location coordinates missing for geofenced attendance');
        }
        const isValid = this.geofenceVerifier.isWithinGeofence(
          command.dto.locationLat,
          command.dto.locationLng,
          session.geofenceLat,
          session.geofenceLng,
          session.geofenceRadius || 100,
        );
        if (!isValid) {
          throw new GeofenceValidationException('User location is outside session geofence boundary');
        }
      }

      if (command.dto.mode === AttendanceMode.QR_CODE && command.dto.qrCode) {
        this.qrService.validateQrCode(command.dto.qrCode, command.dto.sessionId);
      }
    }

    if (command.dto.mode === AttendanceMode.FACE_RECOGNITION && command.dto.biometricHash && command.dto.studentId) {
      await this.biometricService.verifyFaceEmbedding(command.dto.studentId, command.dto.biometricHash);
    }

    const record = await this.repo.markRecord({
      sessionId: command.dto.sessionId,
      studentId: command.dto.studentId,
      teacherId: command.dto.teacherId,
      batchId: command.dto.batchId,
      classId: command.dto.classId,
      subjectId: command.dto.subjectId,
      type: command.dto.type || AttendanceType.DAILY,
      date: command.dto.date ? new Date(command.dto.date) : new Date(),
      status: command.dto.status || AttendanceStatus.PRESENT,
      mode: command.dto.mode || AttendanceMode.MANUAL,
      markedById: command.markedById,
      locationLat: command.dto.locationLat,
      locationLng: command.dto.locationLng,
      remarks: command.dto.remarks,
      biometricHash: command.dto.biometricHash,
      verificationScore: command.dto.verificationScore,
      markedAt: new Date(),
    });

    const event = new AttendanceMarkedEvent(
      record.id,
      record.studentId,
      record.teacherId,
      record.batchId,
      record.status,
      record.mode,
      record.type,
      record.date,
    );

    await this.integrationService.onAttendanceMarked(event);

    return {
      result: AttendanceMapper.toRecordDto(record),
      event,
    };
  }
}

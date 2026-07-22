import { Injectable, Inject } from '@nestjs/common';
import { ATTENDANCE_REPOSITORY_TOKEN, LeaveStatus } from '../../constants/attendance.constants';
import { IAttendanceRepository } from '../../repositories/attendance.repository.interface';
import { CancelLeaveCommand } from '../commands/cancel-leave.command';
import { LeaveRequestResponseDto } from '../dtos/attendance-response.dto';
import { AttendanceMapper } from '../mappers/attendance.mapper';
import { AttendanceNotFoundException } from '../../domain/exceptions/attendance-exceptions';

@Injectable()
export class CancelLeaveHandler {
  constructor(
    @Inject(ATTENDANCE_REPOSITORY_TOKEN)
    private readonly repo: IAttendanceRepository,
  ) {}

  async execute(command: CancelLeaveCommand): Promise<LeaveRequestResponseDto> {
    const existing = await this.repo.findLeaveById(command.leaveId);
    if (!existing) {
      throw new AttendanceNotFoundException(command.leaveId);
    }

    const updated = await this.repo.updateLeaveStatus(
      command.leaveId,
      LeaveStatus.CANCELLED,
      undefined,
      command.dto?.reason || 'Cancelled by applicant',
    );

    return AttendanceMapper.toLeaveDto(updated);
  }
}

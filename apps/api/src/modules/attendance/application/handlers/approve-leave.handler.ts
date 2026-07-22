import { Injectable, Inject } from '@nestjs/common';
import { ATTENDANCE_REPOSITORY_TOKEN, LeaveStatus } from '../../constants/attendance.constants';
import { IAttendanceRepository } from '../../repositories/attendance.repository.interface';
import { ApproveLeaveCommand } from '../commands/approve-leave.command';
import { LeaveRequestResponseDto } from '../dtos/attendance-response.dto';
import { AttendanceMapper } from '../mappers/attendance.mapper';
import { AttendanceNotFoundException } from '../../domain/exceptions/attendance-exceptions';
import { LeaveApprovedEvent } from '../../domain/events/leave-approved.event';
import { AttendanceIntegrationService } from '../services/attendance-integration.service';

@Injectable()
export class ApproveLeaveHandler {
  constructor(
    @Inject(ATTENDANCE_REPOSITORY_TOKEN)
    private readonly repo: IAttendanceRepository,
    private readonly integrationService: AttendanceIntegrationService,
  ) {}

  async execute(command: ApproveLeaveCommand): Promise<{ result: LeaveRequestResponseDto; event: LeaveApprovedEvent }> {
    const leave = await this.repo.findLeaveById(command.leaveId);
    if (!leave) {
      throw new AttendanceNotFoundException(command.leaveId);
    }

    const updated = await this.repo.updateLeaveStatus(command.leaveId, LeaveStatus.APPROVED, command.approvedBy);
    const event = new LeaveApprovedEvent(
      updated.id,
      updated.applicantId,
      updated.applicantType,
      updated.leaveType,
      updated.startDate,
      updated.endDate,
      command.approvedBy,
    );

    await this.integrationService.onLeaveApproved(event);

    return {
      result: AttendanceMapper.toLeaveDto(updated),
      event,
    };
  }
}

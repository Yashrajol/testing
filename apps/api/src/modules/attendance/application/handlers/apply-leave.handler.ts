import { Injectable, Inject } from '@nestjs/common';
import { ATTENDANCE_REPOSITORY_TOKEN, LeaveStatus } from '../../constants/attendance.constants';
import { IAttendanceRepository } from '../../repositories/attendance.repository.interface';
import { ApplyLeaveCommand } from '../commands/apply-leave.command';
import { LeaveRequestResponseDto } from '../dtos/attendance-response.dto';
import { AttendanceMapper } from '../mappers/attendance.mapper';

@Injectable()
export class ApplyLeaveHandler {
  constructor(
    @Inject(ATTENDANCE_REPOSITORY_TOKEN)
    private readonly repo: IAttendanceRepository,
  ) {}

  async execute(command: ApplyLeaveCommand): Promise<LeaveRequestResponseDto> {
    const startDate = new Date(command.dto.startDate);
    const endDate = new Date(command.dto.endDate);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    const leave = await this.repo.createLeaveRequest({
      applicantId: command.dto.applicantId,
      studentId: command.dto.applicantType === 'STUDENT' ? command.dto.applicantId : undefined,
      applicantType: command.dto.applicantType || 'STUDENT',
      leaveType: command.dto.leaveType,
      startDate,
      endDate,
      totalDays,
      reason: command.dto.reason,
      attachmentUrls: command.dto.attachmentUrls || [],
      status: LeaveStatus.PENDING,
      appliedAt: new Date(),
    });

    return AttendanceMapper.toLeaveDto(leave);
  }
}

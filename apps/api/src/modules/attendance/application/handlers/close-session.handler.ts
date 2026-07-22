import { Injectable, Inject } from '@nestjs/common';
import { ATTENDANCE_REPOSITORY_TOKEN } from '../../constants/attendance.constants';
import { IAttendanceRepository } from '../../repositories/attendance.repository.interface';
import { CloseSessionCommand } from '../commands/close-session.command';
import { AttendanceNotFoundException } from '../../domain/exceptions/attendance-not-found.exception';

@Injectable()
export class CloseSessionHandler {
  constructor(
    @Inject(ATTENDANCE_REPOSITORY_TOKEN)
    private readonly repo: IAttendanceRepository,
  ) {}

  async execute(command: CloseSessionCommand): Promise<{ message: string }> {
    const session = await this.repo.findSessionById(command.sessionId);
    if (!session) {
      throw new AttendanceNotFoundException(command.sessionId);
    }

    await this.repo.closeSession(command.sessionId);
    return { message: `Attendance session ${command.sessionId} closed successfully.` };
  }
}

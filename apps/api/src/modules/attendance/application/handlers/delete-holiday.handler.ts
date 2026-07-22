import { Injectable, Inject } from '@nestjs/common';
import { ATTENDANCE_REPOSITORY_TOKEN } from '../../constants/attendance.constants';
import { IAttendanceRepository } from '../../repositories/attendance.repository.interface';
import { DeleteHolidayCommand } from '../commands/delete-holiday.command';

@Injectable()
export class DeleteHolidayHandler {
  constructor(
    @Inject(ATTENDANCE_REPOSITORY_TOKEN)
    private readonly repo: IAttendanceRepository,
  ) {}

  async execute(command: DeleteHolidayCommand): Promise<{ success: boolean; id: string }> {
    await this.repo.deleteHoliday(command.id);
    return { success: true, id: command.id };
  }
}

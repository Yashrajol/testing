import { Injectable, Inject } from '@nestjs/common';
import { ATTENDANCE_REPOSITORY_TOKEN } from '../../constants/attendance.constants';
import { IAttendanceRepository } from '../../repositories/attendance.repository.interface';
import { UpdateHolidayCommand } from '../commands/update-holiday.command';
import { HolidayResponseDto } from '../dtos/attendance-response.dto';
import { AttendanceMapper } from '../mappers/attendance.mapper';

@Injectable()
export class UpdateHolidayHandler {
  constructor(
    @Inject(ATTENDANCE_REPOSITORY_TOKEN)
    private readonly repo: IAttendanceRepository,
  ) {}

  async execute(command: UpdateHolidayCommand): Promise<HolidayResponseDto> {
    const updated = await this.repo.updateHoliday(command.id, {
      title: command.dto.title,
      description: command.dto.description,
      date: command.dto.date ? new Date(command.dto.date) : undefined,
      type: command.dto.type,
      isRecurring: command.dto.isRecurring,
    });

    return AttendanceMapper.toHolidayDto(updated);
  }
}

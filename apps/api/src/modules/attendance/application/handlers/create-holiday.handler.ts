import { Injectable, Inject } from '@nestjs/common';
import { ATTENDANCE_REPOSITORY_TOKEN } from '../../constants/attendance.constants';
import { IAttendanceRepository } from '../../repositories/attendance.repository.interface';
import { CreateHolidayCommand } from '../commands/create-holiday.command';
import { HolidayResponseDto } from '../dtos/attendance-response.dto';
import { AttendanceMapper } from '../mappers/attendance.mapper';

@Injectable()
export class CreateHolidayHandler {
  constructor(
    @Inject(ATTENDANCE_REPOSITORY_TOKEN)
    private readonly repo: IAttendanceRepository,
  ) {}

  async execute(command: CreateHolidayCommand): Promise<HolidayResponseDto> {
    const holiday = await this.repo.createHoliday({
      title: command.dto.title,
      description: command.dto.description,
      date: new Date(command.dto.date),
      endDate: command.dto.endDate ? new Date(command.dto.endDate) : undefined,
      type: command.dto.type,
      isRecurring: command.dto.isRecurring || false,
      affectsClasses: command.dto.affectsClasses !== false,
    });

    return AttendanceMapper.toHolidayDto(holiday);
  }
}

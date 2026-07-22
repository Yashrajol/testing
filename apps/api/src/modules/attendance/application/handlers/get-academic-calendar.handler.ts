import { Injectable, Inject } from '@nestjs/common';
import { ATTENDANCE_REPOSITORY_TOKEN } from '../../constants/attendance.constants';
import { IAttendanceRepository } from '../../repositories/attendance.repository.interface';
import { GetAcademicCalendarQuery } from '../queries/get-academic-calendar.query';
import { HolidayResponseDto } from '../dtos/attendance-response.dto';
import { AttendanceMapper } from '../mappers/attendance.mapper';

@Injectable()
export class GetAcademicCalendarHandler {
  constructor(
    @Inject(ATTENDANCE_REPOSITORY_TOKEN)
    private readonly repo: IAttendanceRepository,
  ) {}

  async execute(query: GetAcademicCalendarQuery): Promise<HolidayResponseDto[]> {
    const holidays = await this.repo.findHolidays({
      year: query.year,
      month: query.month,
    });
    return holidays.map((h) => AttendanceMapper.toHolidayDto(h));
  }
}

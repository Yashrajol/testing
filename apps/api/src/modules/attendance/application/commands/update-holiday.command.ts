import { UpdateHolidayDto } from '../dtos/holiday-dto';

export class UpdateHolidayCommand {
  constructor(public readonly id: string, public readonly dto: UpdateHolidayDto) {}
}

import { CreateHolidayDto } from '../dtos/holiday-dto';

export class CreateHolidayCommand {
  constructor(public readonly dto: CreateHolidayDto) {}
}

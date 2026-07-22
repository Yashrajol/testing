import { UpdateReportDto } from '../dtos/report-dto';

export class UpdateReportCommand {
  constructor(public readonly id: string, public readonly dto: UpdateReportDto) {}
}

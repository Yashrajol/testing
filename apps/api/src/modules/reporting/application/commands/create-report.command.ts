import { CreateReportDto } from '../dtos/report-dto';

export class CreateReportCommand {
  constructor(public readonly dto: CreateReportDto, public readonly authorId: string) {}
}

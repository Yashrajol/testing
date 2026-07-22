import { Injectable, Inject } from '@nestjs/common';
import { REPORTING_REPOSITORY_TOKEN } from '../../constants/reporting.constants';
import { IReportingRepository } from '../../repositories/reporting.repository.interface';
import { UpdateReportCommand } from '../commands/update-report.command';
import { ReportResponseDto } from '../dtos/reporting-response.dto';
import { ReportingMapper } from '../mappers/reporting.mapper';

@Injectable()
export class UpdateReportHandler {
  constructor(
    @Inject(REPORTING_REPOSITORY_TOKEN)
    private readonly repo: IReportingRepository,
  ) {}

  async execute(command: UpdateReportCommand): Promise<ReportResponseDto> {
    const updated = await this.repo.updateReport(command.id, {
      title: command.dto.title,
      config: command.dto.config,
      isScheduled: command.dto.isScheduled,
      frequency: command.dto.frequency,
    });
    return ReportingMapper.toReportDto(updated);
  }
}

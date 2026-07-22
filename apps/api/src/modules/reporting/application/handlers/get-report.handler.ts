import { Injectable, Inject } from '@nestjs/common';
import { REPORTING_REPOSITORY_TOKEN } from '../../constants/reporting.constants';
import { IReportingRepository } from '../../repositories/reporting.repository.interface';
import { GetReportQuery } from '../queries/get-report.query';
import { ReportResponseDto } from '../dtos/reporting-response.dto';
import { ReportingMapper } from '../mappers/reporting.mapper';
import { ReportNotFoundException } from '../../domain/exceptions/reporting-exceptions';

@Injectable()
export class GetReportHandler {
  constructor(
    @Inject(REPORTING_REPOSITORY_TOKEN)
    private readonly repo: IReportingRepository,
  ) {}

  async execute(query: GetReportQuery): Promise<ReportResponseDto> {
    const report = await this.repo.findReportById(query.id);
    if (!report) {
      throw new ReportNotFoundException(query.id);
    }
    return ReportingMapper.toReportDto(report);
  }
}

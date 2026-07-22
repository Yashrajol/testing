import { Injectable, Inject } from '@nestjs/common';
import { REPORTING_REPOSITORY_TOKEN } from '../../constants/reporting.constants';
import { IReportingRepository } from '../../repositories/reporting.repository.interface';
import { GetExportJobQuery } from '../queries/get-export-job.query';
import { ExportJobResponseDto } from '../dtos/reporting-response.dto';
import { ReportingMapper } from '../mappers/reporting.mapper';
import { ExportJobNotFoundException } from '../../domain/exceptions/reporting-exceptions';

@Injectable()
export class GetExportJobHandler {
  constructor(
    @Inject(REPORTING_REPOSITORY_TOKEN)
    private readonly repo: IReportingRepository,
  ) {}

  async execute(query: GetExportJobQuery): Promise<ExportJobResponseDto> {
    const job = await this.repo.findExportJobById(query.id);
    if (!job) {
      throw new ExportJobNotFoundException(query.id);
    }
    return ReportingMapper.toExportJobDto(job);
  }
}

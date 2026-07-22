import { Injectable, Inject } from '@nestjs/common';
import { REPORTING_REPOSITORY_TOKEN, ExportStatus } from '../../constants/reporting.constants';
import { IReportingRepository } from '../../repositories/reporting.repository.interface';
import { TriggerExportCommand } from '../commands/trigger-export.command';
import { ExportJobResponseDto } from '../dtos/reporting-response.dto';
import { ReportingMapper } from '../mappers/reporting.mapper';
import { BackgroundExportService } from '../services/background-export.service';
import { ExportJobCompletedEvent } from '../../domain/events/export-job-completed.event';
import { EventDispatcher } from '@vedhkrit/events';

@Injectable()
export class TriggerExportHandler {
  constructor(
    @Inject(REPORTING_REPOSITORY_TOKEN)
    private readonly repo: IReportingRepository,
    private readonly exportService: BackgroundExportService,
    private readonly eventDispatcher: EventDispatcher,
  ) {}

  async execute(command: TriggerExportCommand): Promise<ExportJobResponseDto> {
    const job = await this.repo.createExportJob({
      organizationId: command.dto.organizationId,
      tenantId: command.dto.tenantId,
      reportId: command.dto.reportId,
      reportType: command.dto.reportType,
      format: command.dto.format,
      status: ExportStatus.QUEUED,
      requestedBy: command.requestedBy,
    });

    const completedJob = await this.exportService.processExportJob(job);

    if (completedJob.status === ExportStatus.COMPLETED && completedJob.fileUrl) {
      await this.eventDispatcher.publish(
        new ExportJobCompletedEvent(
          completedJob.id,
          completedJob.format,
          completedJob.fileUrl,
          completedJob.requestedBy,
        ),
      );
    }

    return ReportingMapper.toExportJobDto(completedJob);
  }
}

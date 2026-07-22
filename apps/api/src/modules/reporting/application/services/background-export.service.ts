import { Injectable, Logger, Inject } from '@nestjs/common';
import { REPORTING_REPOSITORY_TOKEN, ExportFormat, ExportStatus } from '../../constants/reporting.constants';
import { IReportingRepository } from '../../repositories/reporting.repository.interface';
import { ExportJobEntity } from '../../domain/entities/export-job.entity';

@Injectable()
export class BackgroundExportService {
  private readonly logger = new Logger(BackgroundExportService.name);

  constructor(
    @Inject(REPORTING_REPOSITORY_TOKEN)
    private readonly repo: IReportingRepository,
  ) {}

  async processExportJob(exportJob: ExportJobEntity): Promise<ExportJobEntity> {
    this.logger.log(`[BackgroundExport] Generating ${exportJob.format} export for job ${exportJob.id} (${exportJob.reportType})`);

    await this.repo.updateExportJobStatus(exportJob.id, ExportStatus.PROCESSING);

    // Simulate async generation and storage upload
    const fileExtension = exportJob.format.toLowerCase();
    const simulatedFileUrl = `https://storage.vedhkrit.com/exports/${exportJob.id}.${fileExtension}`;
    const simulatedFileSize = Math.floor(Math.random() * 2000000) + 500000; // ~500KB - 2.5MB

    const completedJob = await this.repo.updateExportJobStatus(
      exportJob.id,
      ExportStatus.COMPLETED,
      simulatedFileUrl,
      simulatedFileSize,
    );

    this.logger.log(`[BackgroundExport] Export job ${exportJob.id} completed successfully. File URL: ${simulatedFileUrl}`);
    return completedJob;
  }
}

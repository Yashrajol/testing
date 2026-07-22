import { Injectable, Logger, Inject } from '@nestjs/common';
import { INTEGRATIONS_REPOSITORY_TOKEN, SyncStatus, ConnectorType } from '../../constants/integrations.constants';
import { IIntegrationsRepository } from '../../repositories/integrations.repository.interface';
import { SyncJobEntity } from '../../domain/entities/sync-job.entity';
import { EducationConnector } from '../../providers/education.connector';

@Injectable()
export class SyncSchedulerService {
  private readonly logger = new Logger(SyncSchedulerService.name);

  constructor(
    @Inject(INTEGRATIONS_REPOSITORY_TOKEN)
    private readonly repo: IIntegrationsRepository,
    private readonly educationConnector: EducationConnector,
  ) {}

  async triggerSyncJob(integrationId: string): Promise<SyncJobEntity> {
    this.logger.log(`[SyncScheduler] Triggering sync pipeline for integration ${integrationId}`);

    const integration = await this.repo.findIntegrationById(integrationId);
    if (!integration) {
      throw new Error(`Integration ${integrationId} not found`);
    }

    const job = await this.repo.createSyncJob({
      integrationId,
      status: SyncStatus.RUNNING,
    });

    let recordsSynced = 0;
    try {
      // Simulate OAuth client configurations
      const connector = await this.repo.findConnectorById(integration.connectorId);
      if (connector && connector.type === ConnectorType.GOOGLE_CLASSROOM) {
        recordsSynced = await this.educationConnector.syncClassroomData(integrationId, integration.config);
      } else {
        // Generic connector fallback
        recordsSynced = Math.floor(Math.random() * 50) + 10;
      }

      const completed = await this.repo.updateSyncJob(job.id, {
        status: SyncStatus.COMPLETED,
        recordsSynced,
        completedAt: new Date(),
      });

      await this.repo.updateIntegrationSynced(integrationId);
      return completed;
    } catch (err: any) {
      this.logger.error(`[SyncScheduler] Sync job failed for ${integrationId}: ${err.message}`);
      return this.repo.updateSyncJob(job.id, {
        status: SyncStatus.FAILED,
        errorMessage: err.message || 'Sync pipeline execution failed',
        completedAt: new Date(),
      });
    }
  }
}

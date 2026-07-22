import { Injectable } from '@nestjs/common';
import { TriggerSyncCommand } from '../commands/trigger-sync.command';
import { SyncJobResponseDto } from '../dtos/integrations-response.dto';
import { IntegrationsMapper } from '../mappers/integrations.mapper';
import { SyncSchedulerService } from '../services/sync-scheduler.service';

@Injectable()
export class TriggerSyncHandler {
  constructor(private readonly syncScheduler: SyncSchedulerService) {}

  async execute(command: TriggerSyncCommand): Promise<SyncJobResponseDto> {
    const job = await this.syncScheduler.triggerSyncJob(command.integrationId);
    return IntegrationsMapper.toSyncJobDto(job);
  }
}

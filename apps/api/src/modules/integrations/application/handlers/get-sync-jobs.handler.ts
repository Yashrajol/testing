import { Injectable, Inject } from '@nestjs/common';
import { INTEGRATIONS_REPOSITORY_TOKEN } from '../../constants/integrations.constants';
import { IIntegrationsRepository } from '../../repositories/integrations.repository.interface';
import { GetSyncJobsQuery } from '../queries/get-sync-jobs.query';
import { SyncJobResponseDto } from '../dtos/integrations-response.dto';
import { IntegrationsMapper } from '../mappers/integrations.mapper';

@Injectable()
export class GetSyncJobsHandler {
  constructor(
    @Inject(INTEGRATIONS_REPOSITORY_TOKEN)
    private readonly repo: IIntegrationsRepository,
  ) {}

  async execute(query: GetSyncJobsQuery): Promise<SyncJobResponseDto[]> {
    const jobs = await this.repo.findSyncJobs(query.integrationId);
    return jobs.map((j) => IntegrationsMapper.toSyncJobDto(j));
  }
}

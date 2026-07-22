import { Injectable, Inject } from '@nestjs/common';
import { INTEGRATIONS_REPOSITORY_TOKEN } from '../../constants/integrations.constants';
import { IIntegrationsRepository } from '../../repositories/integrations.repository.interface';
import { GetIntegrationsQuery } from '../queries/get-integrations.query';
import { IntegrationResponseDto } from '../dtos/integrations-response.dto';
import { IntegrationsMapper } from '../mappers/integrations.mapper';

@Injectable()
export class GetIntegrationsHandler {
  constructor(
    @Inject(INTEGRATIONS_REPOSITORY_TOKEN)
    private readonly repo: IIntegrationsRepository,
  ) {}

  async execute(query: GetIntegrationsQuery): Promise<IntegrationResponseDto[]> {
    const integrations = await this.repo.findIntegrations(query.options);
    return integrations.map((i) => IntegrationsMapper.toIntegrationDto(i));
  }
}

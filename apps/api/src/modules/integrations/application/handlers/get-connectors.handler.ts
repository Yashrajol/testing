import { Injectable, Inject } from '@nestjs/common';
import { INTEGRATIONS_REPOSITORY_TOKEN } from '../../constants/integrations.constants';
import { IIntegrationsRepository } from '../../repositories/integrations.repository.interface';
import { GetConnectorsQuery } from '../queries/get-connectors.query';
import { ConnectorResponseDto } from '../dtos/integrations-response.dto';
import { IntegrationsMapper } from '../mappers/integrations.mapper';

@Injectable()
export class GetConnectorsHandler {
  constructor(
    @Inject(INTEGRATIONS_REPOSITORY_TOKEN)
    private readonly repo: IIntegrationsRepository,
  ) {}

  async execute(query: GetConnectorsQuery): Promise<ConnectorResponseDto[]> {
    const connectors = await this.repo.findConnectors();
    return connectors.map((c) => IntegrationsMapper.toConnectorDto(c));
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { INTEGRATIONS_REPOSITORY_TOKEN } from '../../constants/integrations.constants';
import { IIntegrationsRepository } from '../../repositories/integrations.repository.interface';
import { CreateIntegrationCommand } from '../commands/create-integration.command';
import { IntegrationResponseDto } from '../dtos/integrations-response.dto';
import { IntegrationsMapper } from '../mappers/integrations.mapper';

@Injectable()
export class CreateIntegrationHandler {
  constructor(
    @Inject(INTEGRATIONS_REPOSITORY_TOKEN)
    private readonly repo: IIntegrationsRepository,
  ) {}

  async execute(command: CreateIntegrationCommand): Promise<IntegrationResponseDto> {
    const integration = await this.repo.createIntegration({
      organizationId: command.dto.organizationId,
      tenantId: command.dto.tenantId,
      connectorId: command.dto.connectorId,
      config: command.dto.config,
    });

    return IntegrationsMapper.toIntegrationDto(integration);
  }
}

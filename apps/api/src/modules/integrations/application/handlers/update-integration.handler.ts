import { Injectable, Inject } from '@nestjs/common';
import { INTEGRATIONS_REPOSITORY_TOKEN } from '../../constants/integrations.constants';
import { IIntegrationsRepository } from '../../repositories/integrations.repository.interface';
import { UpdateIntegrationCommand } from '../commands/update-integration.command';
import { IntegrationResponseDto } from '../dtos/integrations-response.dto';
import { IntegrationsMapper } from '../mappers/integrations.mapper';

@Injectable()
export class UpdateIntegrationHandler {
  constructor(
    @Inject(INTEGRATIONS_REPOSITORY_TOKEN)
    private readonly repo: IIntegrationsRepository,
  ) {}

  async execute(command: UpdateIntegrationCommand): Promise<IntegrationResponseDto> {
    const updated = await this.repo.updateIntegration(command.id, {
      config: command.dto.config,
      status: command.dto.status,
    });
    return IntegrationsMapper.toIntegrationDto(updated);
  }
}

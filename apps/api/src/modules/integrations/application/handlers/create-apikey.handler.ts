import { Injectable, Inject } from '@nestjs/common';
import { INTEGRATIONS_REPOSITORY_TOKEN } from '../../constants/integrations.constants';
import { IIntegrationsRepository } from '../../repositories/integrations.repository.interface';
import { CreateApiKeyCommand } from '../commands/create-apikey.command';
import { ApiKeyResponseDto } from '../dtos/integrations-response.dto';
import { IntegrationsMapper } from '../mappers/integrations.mapper';

@Injectable()
export class CreateApiKeyHandler {
  constructor(
    @Inject(INTEGRATIONS_REPOSITORY_TOKEN)
    private readonly repo: IIntegrationsRepository,
  ) {}

  async execute(command: CreateApiKeyCommand): Promise<ApiKeyResponseDto> {
    const plainTextKey = `vkey_live_${Math.random().toString(36).substring(2)}${Math.random().toString(36).substring(2)}`;
    // Simple hash for simulation (e.g. SHA256 in production)
    const keyHash = `sha256:${plainTextKey}`;

    const apiKey = await this.repo.createApiKey({
      organizationId: command.dto.organizationId,
      tenantId: command.dto.tenantId,
      name: command.dto.name,
      keyHash,
      scopes: command.dto.scopes,
      expiresAt: command.dto.expiresAt ? new Date(command.dto.expiresAt) : undefined,
    });

    return IntegrationsMapper.toApiKeyDto(apiKey, plainTextKey);
  }
}

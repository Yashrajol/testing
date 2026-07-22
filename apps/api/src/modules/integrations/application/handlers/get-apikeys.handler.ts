import { Injectable, Inject } from '@nestjs/common';
import { INTEGRATIONS_REPOSITORY_TOKEN } from '../../constants/integrations.constants';
import { IIntegrationsRepository } from '../../repositories/integrations.repository.interface';
import { GetApiKeysQuery } from '../queries/get-apikeys.query';
import { ApiKeyResponseDto } from '../dtos/integrations-response.dto';
import { IntegrationsMapper } from '../mappers/integrations.mapper';

@Injectable()
export class GetApiKeysHandler {
  constructor(
    @Inject(INTEGRATIONS_REPOSITORY_TOKEN)
    private readonly repo: IIntegrationsRepository,
  ) {}

  async execute(query: GetApiKeysQuery): Promise<ApiKeyResponseDto[]> {
    const keys = await this.repo.findApiKeys(query.options);
    return keys.map((k) => IntegrationsMapper.toApiKeyDto(k));
  }
}

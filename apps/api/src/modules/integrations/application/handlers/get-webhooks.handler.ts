import { Injectable, Inject } from '@nestjs/common';
import { INTEGRATIONS_REPOSITORY_TOKEN } from '../../constants/integrations.constants';
import { IIntegrationsRepository } from '../../repositories/integrations.repository.interface';
import { GetWebhooksQuery } from '../queries/get-webhooks.query';
import { WebhookResponseDto } from '../dtos/integrations-response.dto';
import { IntegrationsMapper } from '../mappers/integrations.mapper';

@Injectable()
export class GetWebhooksHandler {
  constructor(
    @Inject(INTEGRATIONS_REPOSITORY_TOKEN)
    private readonly repo: IIntegrationsRepository,
  ) {}

  async execute(query: GetWebhooksQuery): Promise<WebhookResponseDto[]> {
    const webhooks = await this.repo.findWebhooks(query.options);
    return webhooks.map((w) => IntegrationsMapper.toWebhookDto(w));
  }
}

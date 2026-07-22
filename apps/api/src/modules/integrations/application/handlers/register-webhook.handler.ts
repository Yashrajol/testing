import { Injectable, Inject } from '@nestjs/common';
import { INTEGRATIONS_REPOSITORY_TOKEN } from '../../constants/integrations.constants';
import { IIntegrationsRepository } from '../../repositories/integrations.repository.interface';
import { RegisterWebhookCommand } from '../commands/register-webhook.command';
import { WebhookResponseDto } from '../dtos/integrations-response.dto';
import { IntegrationsMapper } from '../mappers/integrations.mapper';

@Injectable()
export class RegisterWebhookHandler {
  constructor(
    @Inject(INTEGRATIONS_REPOSITORY_TOKEN)
    private readonly repo: IIntegrationsRepository,
  ) {}

  async execute(command: RegisterWebhookCommand): Promise<WebhookResponseDto> {
    const webhook = await this.repo.createWebhook({
      organizationId: command.dto.organizationId,
      tenantId: command.dto.tenantId,
      url: command.dto.url,
      events: command.dto.events,
      secret: command.dto.secret,
    });

    return IntegrationsMapper.toWebhookDto(webhook);
  }
}

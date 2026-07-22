import { Injectable, Logger, Inject } from '@nestjs/common';
import { INTEGRATIONS_REPOSITORY_TOKEN } from '../../constants/integrations.constants';
import { IIntegrationsRepository } from '../../repositories/integrations.repository.interface';
import { WebhookEntity } from '../../domain/entities/webhook.entity';

@Injectable()
export class WebhookDispatcherService {
  private readonly logger = new Logger(WebhookDispatcherService.name);

  constructor(
    @Inject(INTEGRATIONS_REPOSITORY_TOKEN)
    private readonly repo: IIntegrationsRepository,
  ) {}

  async dispatch(eventTopic: string, payload: any, organizationId?: string): Promise<void> {
    this.logger.log(`[WebhookDispatcher] Triggering callbacks for topic "${eventTopic}"`);

    const webhooks = await this.repo.findWebhooks({ organizationId, isActive: true });
    const targets = webhooks.filter((w) => w.events.includes(eventTopic));

    for (const wh of targets) {
      await this.dispatchToUrl(wh, eventTopic, payload);
    }
  }

  private async dispatchToUrl(webhook: WebhookEntity, topic: string, payload: any): Promise<void> {
    this.logger.log(`[WebhookDispatcher] Dispatching payload to webhook url ${webhook.url}`);
    
    // Simulate HTTP request with signature header:
    // const signature = crypto.createHmac('sha256', webhook.secret).update(JSON.stringify(payload)).digest('hex');
    const mockSignature = `sha256=${Math.random().toString(36).substring(2)}`;

    try {
      this.logger.log(`[WebhookDispatcher] Webhook delivered to ${webhook.url}. Header: x-vedhkrit-signature=${mockSignature}`);
    } catch (err: any) {
      this.logger.error(`[WebhookDispatcher] Webhook delivery failed for ${webhook.url}: ${err.message}`);
    }
  }
}

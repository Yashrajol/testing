import { WebhookFilterOptions } from '../../types/integrations.types';

export class GetWebhooksQuery {
  constructor(public readonly options?: WebhookFilterOptions) {}
}

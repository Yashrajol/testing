import { DomainEvent, EventMetadata } from '@vedhkrit/events';

export class WebhookTriggeredEvent implements DomainEvent {
  public readonly eventName = 'integrations.webhook_triggered';
  public readonly metadata: EventMetadata;

  constructor(
    public readonly aggregateId: string, // webhookId
    public readonly url: string,
    public readonly triggerTopic: string,
    public readonly payload: any,
  ) {
    this.metadata = {
      eventId: Math.random().toString(36).substring(2),
      version: 1,
      occurredOn: new Date(),
    };
  }
}

import { DomainEvent, EventMetadata } from '@vedhkrit/events';

export class ApiKeyCreatedEvent implements DomainEvent {
  public readonly eventName = 'integrations.apikey_created';
  public readonly metadata: EventMetadata;

  constructor(
    public readonly aggregateId: string, // apiKeyId
    public readonly name: string,
    public readonly scopes: string[],
  ) {
    this.metadata = {
      eventId: Math.random().toString(36).substring(2),
      version: 1,
      occurredOn: new Date(),
    };
  }
}

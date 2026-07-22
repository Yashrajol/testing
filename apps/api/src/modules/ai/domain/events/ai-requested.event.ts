import { DomainEvent, EventMetadata } from '@vedhkrit/events';

export class AIRequestedEvent implements DomainEvent {
  public readonly eventName = 'ai.requested';
  public readonly metadata: EventMetadata;

  constructor(
    public readonly aggregateId: string, // requestId
    public readonly provider: string,
    public readonly promptType: string,
    public readonly userId?: string,
  ) {
    this.metadata = {
      eventId: Math.random().toString(36).substring(2),
      version: 1,
      occurredOn: new Date(),
    };
  }
}

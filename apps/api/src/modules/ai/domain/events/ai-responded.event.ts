import { DomainEvent, EventMetadata } from '@vedhkrit/events';

export class AIRespondedEvent implements DomainEvent {
  public readonly eventName = 'ai.responded';
  public readonly metadata: EventMetadata;

  constructor(
    public readonly aggregateId: string, // responseId
    public readonly requestId: string,
    public readonly cost: number,
    public readonly latencyMs: number,
  ) {
    this.metadata = {
      eventId: Math.random().toString(36).substring(2),
      version: 1,
      occurredOn: new Date(),
    };
  }
}

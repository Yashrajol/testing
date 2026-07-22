import { DomainEvent, EventMetadata } from '@vedhkrit/events';

export class AdaptivePathUpdatedEvent implements DomainEvent {
  public readonly eventName = 'AdaptivePathUpdated';
  public readonly metadata: EventMetadata;

  constructor(
    public readonly aggregateId: string,
    public readonly nodesCount: number,
  ) {
    this.metadata = {
      eventId: Math.random().toString(36).substring(2),
      version: 1,
      occurredOn: new Date(),
    };
  }
}

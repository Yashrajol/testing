import { DomainEvent, EventMetadata } from '@vedhkrit/events';

export class VedhkritIndexRecalculatedEvent implements DomainEvent {
  public readonly eventName = 'VedhkritIndexRecalculated';
  public readonly metadata: EventMetadata;

  constructor(
    public readonly aggregateId: string,
    public readonly score: number,
    public readonly readinessLevel: string,
  ) {
    this.metadata = {
      eventId: Math.random().toString(36).substring(2),
      version: 1,
      occurredOn: new Date(),
    };
  }
}

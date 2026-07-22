import { DomainEvent, EventMetadata } from '@vedhkrit/events';

export class MasteryCalculatedEvent implements DomainEvent {
  public readonly eventName = 'MasteryCalculated';
  public readonly metadata: EventMetadata;

  constructor(
    public readonly aggregateId: string,
    public readonly subjectId: string,
    public readonly masteryScore: number,
    public readonly retentionScore: number,
  ) {
    this.metadata = {
      eventId: Math.random().toString(36).substring(2),
      version: 1,
      occurredOn: new Date(),
    };
  }
}

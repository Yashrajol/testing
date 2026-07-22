import { DomainEvent, EventMetadata } from '@vedhkrit/events';

export class InsightGeneratedEvent implements DomainEvent {
  public readonly eventName = 'ai.insight_generated';
  public readonly metadata: EventMetadata;

  constructor(
    public readonly aggregateId: string, // insightId
    public readonly studentId: string,
    public readonly focusScore: number,
  ) {
    this.metadata = {
      eventId: Math.random().toString(36).substring(2),
      version: 1,
      occurredOn: new Date(),
    };
  }
}

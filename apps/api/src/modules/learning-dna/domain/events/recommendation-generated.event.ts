import { DomainEvent, EventMetadata } from '@vedhkrit/events';

export class RecommendationGeneratedEvent implements DomainEvent {
  public readonly eventName = 'RecommendationGenerated';
  public readonly metadata: EventMetadata;

  constructor(
    public readonly aggregateId: string,
    public readonly title: string,
    public readonly actionType: string,
    public readonly priority: string,
  ) {
    this.metadata = {
      eventId: Math.random().toString(36).substring(2),
      version: 1,
      occurredOn: new Date(),
    };
  }
}

import { DomainEvent, EventMetadata } from '@vedhkrit/events';

export class CareerRecommendationsUpdatedEvent implements DomainEvent {
  public readonly eventName = 'CareerRecommendationsUpdated';
  public readonly metadata: EventMetadata;

  constructor(
    public readonly aggregateId: string,
    public readonly topRole: string,
    public readonly matchPercentage: number,
  ) {
    this.metadata = {
      eventId: Math.random().toString(36).substring(2),
      version: 1,
      occurredOn: new Date(),
    };
  }
}

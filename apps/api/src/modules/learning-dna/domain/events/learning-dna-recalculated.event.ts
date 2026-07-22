import { DomainEvent, EventMetadata } from '@vedhkrit/events';

export class LearningDnaRecalculatedEvent implements DomainEvent {
  public readonly eventName = 'LearningDnaRecalculated';
  public readonly metadata: EventMetadata;

  constructor(
    public readonly aggregateId: string,
    public readonly masteryScore: number,
    public readonly growthScore: number,
    public readonly riskScore: number,
  ) {
    this.metadata = {
      eventId: Math.random().toString(36).substring(2),
      version: 1,
      occurredOn: new Date(),
    };
  }
}

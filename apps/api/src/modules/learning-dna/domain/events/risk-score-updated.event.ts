import { DomainEvent, EventMetadata } from '@vedhkrit/events';

export class RiskScoreUpdatedEvent implements DomainEvent {
  public readonly eventName = 'RiskScoreUpdated';
  public readonly metadata: EventMetadata;

  constructor(
    public readonly aggregateId: string,
    public readonly riskScore: number,
    public readonly riskLevel: string,
  ) {
    this.metadata = {
      eventId: Math.random().toString(36).substring(2),
      version: 1,
      occurredOn: new Date(),
    };
  }
}

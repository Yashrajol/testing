import { DomainEvent, EventMetadata } from '@vedhkrit/events';

export class SnapshotCalculatedEvent implements DomainEvent {
  public readonly eventName = 'reporting.snapshot_calculated';
  public readonly metadata: EventMetadata;

  constructor(
    public readonly aggregateId: string, // snapshotId
    public readonly entityType: string,
    public readonly targetId: string, // studentId or teacherId
    public readonly riskLevel: string,
  ) {
    this.metadata = {
      eventId: Math.random().toString(36).substring(2),
      version: 1,
      occurredOn: new Date(),
    };
  }
}

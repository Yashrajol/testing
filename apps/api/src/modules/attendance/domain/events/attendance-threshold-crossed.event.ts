import { DomainEvent, EventMetadata } from '@vedhkrit/events';

export class AttendanceThresholdCrossedEvent implements DomainEvent {
  public readonly eventName = 'attendance.threshold_crossed';
  public readonly metadata: EventMetadata;

  constructor(
    public readonly aggregateId: string,
    public readonly studentId: string,
    public readonly currentPercentage: number,
    public readonly thresholdPercentage: number,
    public readonly totalSessions: number,
    public readonly attendedSessions: number,
    public readonly consecutiveAbsences: number,
  ) {
    this.metadata = {
      eventId: Math.random().toString(36).substring(2),
      version: 1,
      occurredOn: new Date(),
    };
  }
}

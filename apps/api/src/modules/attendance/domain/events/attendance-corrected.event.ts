import { DomainEvent, EventMetadata } from '@vedhkrit/events';
import { AttendanceStatus } from '../../constants/attendance.constants';

export class AttendanceCorrectedEvent implements DomainEvent {
  public readonly eventName = 'attendance.corrected';
  public readonly metadata: EventMetadata;

  constructor(
    public readonly aggregateId: string,
    public readonly studentId: string | undefined | null,
    public readonly previousStatus: AttendanceStatus,
    public readonly updatedStatus: AttendanceStatus,
    public readonly correctedById: string,
    public readonly reason: string,
  ) {
    this.metadata = {
      eventId: Math.random().toString(36).substring(2),
      version: 1,
      occurredOn: new Date(),
    };
  }
}

import { DomainEvent, EventMetadata } from '@vedhkrit/events';
import { AttendanceStatus, AttendanceMode, AttendanceType } from '../../constants/attendance.constants';

export class AttendanceMarkedEvent implements DomainEvent {
  public readonly eventName = 'attendance.marked';
  public readonly metadata: EventMetadata;

  constructor(
    public readonly aggregateId: string,
    public readonly studentId: string | undefined | null,
    public readonly teacherId: string | undefined | null,
    public readonly batchId: string | undefined | null,
    public readonly status: AttendanceStatus,
    public readonly mode: AttendanceMode,
    public readonly type: AttendanceType,
    public readonly date: Date,
  ) {
    this.metadata = {
      eventId: Math.random().toString(36).substring(2),
      version: 1,
      occurredOn: new Date(),
    };
  }
}

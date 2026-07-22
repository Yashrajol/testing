import { DomainEvent, EventMetadata } from '@vedhkrit/events';
import { LeaveType } from '../../constants/attendance.constants';

export class LeaveApprovedEvent implements DomainEvent {
  public readonly eventName = 'leave.approved';
  public readonly metadata: EventMetadata;

  constructor(
    public readonly aggregateId: string,
    public readonly applicantId: string,
    public readonly applicantType: string,
    public readonly leaveType: LeaveType,
    public readonly startDate: Date,
    public readonly endDate: Date,
    public readonly approvedById?: string,
  ) {
    this.metadata = {
      eventId: Math.random().toString(36).substring(2),
      version: 1,
      occurredOn: new Date(),
    };
  }
}

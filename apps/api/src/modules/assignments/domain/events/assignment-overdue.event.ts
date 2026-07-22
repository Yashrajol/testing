import { DomainEvent, EventMetadata } from '@vedhkrit/events';

export class AssignmentOverdueEvent implements DomainEvent {
  public readonly eventName = 'assignment.overdue';
  public readonly metadata: EventMetadata;

  constructor(
    public readonly aggregateId: string, // assignmentId
    public readonly studentId: string,
    public readonly dueDate: Date,
  ) {
    this.metadata = {
      eventId: Math.random().toString(36).substring(2),
      version: 1,
      occurredOn: new Date(),
    };
  }
}

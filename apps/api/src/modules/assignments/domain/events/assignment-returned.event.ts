import { DomainEvent, EventMetadata } from '@vedhkrit/events';

export class AssignmentReturnedEvent implements DomainEvent {
  public readonly eventName = 'assignment.returned';
  public readonly metadata: EventMetadata;

  constructor(
    public readonly aggregateId: string, // submissionId
    public readonly assignmentId: string,
    public readonly studentId: string,
    public readonly returnedById: string,
    public readonly reason?: string,
  ) {
    this.metadata = {
      eventId: Math.random().toString(36).substring(2),
      version: 1,
      occurredOn: new Date(),
    };
  }
}

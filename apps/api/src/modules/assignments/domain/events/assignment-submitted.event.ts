import { DomainEvent, EventMetadata } from '@vedhkrit/events';

export class AssignmentSubmittedEvent implements DomainEvent {
  public readonly eventName = 'assignment.submitted';
  public readonly metadata: EventMetadata;

  constructor(
    public readonly aggregateId: string, // submissionId
    public readonly assignmentId: string,
    public readonly studentId: string,
    public readonly attemptNumber: number,
    public readonly isLate: boolean,
    public readonly submittedAt: Date,
  ) {
    this.metadata = {
      eventId: Math.random().toString(36).substring(2),
      version: 1,
      occurredOn: new Date(),
    };
  }
}

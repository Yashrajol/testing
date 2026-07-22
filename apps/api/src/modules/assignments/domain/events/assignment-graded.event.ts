import { DomainEvent, EventMetadata } from '@vedhkrit/events';

export class AssignmentGradedEvent implements DomainEvent {
  public readonly eventName = 'assignment.graded';
  public readonly metadata: EventMetadata;

  constructor(
    public readonly aggregateId: string, // submissionId
    public readonly assignmentId: string,
    public readonly studentId: string,
    public readonly score: number,
    public readonly totalPoints: number,
    public readonly gradedById: string,
    public readonly gradedAt: Date,
  ) {
    this.metadata = {
      eventId: Math.random().toString(36).substring(2),
      version: 1,
      occurredOn: new Date(),
    };
  }
}

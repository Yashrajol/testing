import { DomainEvent, EventMetadata } from '@vedhkrit/events';
import { AssignmentCategory } from '../../constants/assignments.constants';

export class AssignmentCreatedEvent implements DomainEvent {
  public readonly eventName = 'assignment.created';
  public readonly metadata: EventMetadata;

  constructor(
    public readonly aggregateId: string,
    public readonly title: string,
    public readonly category: AssignmentCategory,
    public readonly batchId: string | undefined | null,
    public readonly dueDate: Date,
    public readonly totalPoints: number,
  ) {
    this.metadata = {
      eventId: Math.random().toString(36).substring(2),
      version: 1,
      occurredOn: new Date(),
    };
  }
}

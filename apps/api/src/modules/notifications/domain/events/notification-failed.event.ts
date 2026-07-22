import { DomainEvent, EventMetadata } from '@vedhkrit/events';
import { NotificationChannel } from '../../constants/notifications.constants';

export class NotificationFailedEvent implements DomainEvent {
  public readonly eventName = 'notification.failed';
  public readonly metadata: EventMetadata;

  constructor(
    public readonly aggregateId: string, // notificationId
    public readonly recipientId: string,
    public readonly channel: NotificationChannel,
    public readonly errorMessage: string,
    public readonly attemptCount: number,
  ) {
    this.metadata = {
      eventId: Math.random().toString(36).substring(2),
      version: 1,
      occurredOn: new Date(),
    };
  }
}

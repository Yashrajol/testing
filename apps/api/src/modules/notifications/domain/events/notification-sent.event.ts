import { DomainEvent, EventMetadata } from '@vedhkrit/events';
import { NotificationChannel, NotificationType } from '../../constants/notifications.constants';

export class NotificationSentEvent implements DomainEvent {
  public readonly eventName = 'notification.sent';
  public readonly metadata: EventMetadata;

  constructor(
    public readonly aggregateId: string, // notificationId
    public readonly recipientId: string,
    public readonly channel: NotificationChannel,
    public readonly type: NotificationType,
    public readonly sentAt: Date,
  ) {
    this.metadata = {
      eventId: Math.random().toString(36).substring(2),
      version: 1,
      occurredOn: new Date(),
    };
  }
}

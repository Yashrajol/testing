import { DomainEvent, EventMetadata } from '@vedhkrit/events';
import { TargetAudienceRole } from '../../constants/notifications.constants';

export class AnnouncementPublishedEvent implements DomainEvent {
  public readonly eventName = 'announcement.published';
  public readonly metadata: EventMetadata;

  constructor(
    public readonly aggregateId: string, // announcementId
    public readonly title: string,
    public readonly targetRole: TargetAudienceRole,
    public readonly publishedAt: Date,
  ) {
    this.metadata = {
      eventId: Math.random().toString(36).substring(2),
      version: 1,
      occurredOn: new Date(),
    };
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { NOTIFICATION_REPOSITORY_TOKEN } from '../../constants/notifications.constants';
import { INotificationRepository } from '../../repositories/notification.repository.interface';
import { PublishAnnouncementCommand } from '../commands/publish-announcement.command';
import { AnnouncementResponseDto } from '../dtos/notification-response.dto';
import { NotificationMapper } from '../mappers/notification.mapper';
import { AnnouncementPublishedEvent } from '../../domain/events/announcement-published.event';
import { EventDispatcher } from '@vedhkrit/events';

@Injectable()
export class PublishAnnouncementHandler {
  constructor(
    @Inject(NOTIFICATION_REPOSITORY_TOKEN)
    private readonly repo: INotificationRepository,
    private readonly eventDispatcher: EventDispatcher,
  ) {}

  async execute(command: PublishAnnouncementCommand): Promise<AnnouncementResponseDto> {
    const updated = await this.repo.publishAnnouncement(command.id);

    await this.eventDispatcher.publish(
      new AnnouncementPublishedEvent(
        updated.id,
        updated.title,
        updated.targetRole,
        new Date(),
      ),
    );

    return NotificationMapper.toAnnouncementDto(updated);
  }
}

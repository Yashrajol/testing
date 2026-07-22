import { Injectable, Inject } from '@nestjs/common';
import { NOTIFICATION_REPOSITORY_TOKEN } from '../../constants/notifications.constants';
import { INotificationRepository } from '../../repositories/notification.repository.interface';
import { GetAnnouncementsQuery } from '../queries/get-announcements.query';
import { AnnouncementResponseDto } from '../dtos/notification-response.dto';
import { NotificationMapper } from '../mappers/notification.mapper';

@Injectable()
export class GetAnnouncementsHandler {
  constructor(
    @Inject(NOTIFICATION_REPOSITORY_TOKEN)
    private readonly repo: INotificationRepository,
  ) {}

  async execute(query: GetAnnouncementsQuery): Promise<AnnouncementResponseDto[]> {
    const announcements = await this.repo.findAnnouncements(query.options);
    return announcements.map((a) => NotificationMapper.toAnnouncementDto(a));
  }
}

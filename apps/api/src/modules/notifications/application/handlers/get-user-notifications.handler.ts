import { Injectable, Inject } from '@nestjs/common';
import { NOTIFICATION_REPOSITORY_TOKEN } from '../../constants/notifications.constants';
import { INotificationRepository } from '../../repositories/notification.repository.interface';
import { GetUserNotificationsQuery } from '../queries/get-user-notifications.query';
import { NotificationResponseDto } from '../dtos/notification-response.dto';
import { NotificationMapper } from '../mappers/notification.mapper';

@Injectable()
export class GetUserNotificationsHandler {
  constructor(
    @Inject(NOTIFICATION_REPOSITORY_TOKEN)
    private readonly repo: INotificationRepository,
  ) {}

  async execute(query: GetUserNotificationsQuery): Promise<NotificationResponseDto[]> {
    const notifs = await this.repo.findNotifications({
      recipientId: query.recipientId,
      ...query.options,
    });
    return notifs.map((n) => NotificationMapper.toNotificationDto(n));
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { NOTIFICATION_REPOSITORY_TOKEN } from '../../constants/notifications.constants';
import { INotificationRepository } from '../../repositories/notification.repository.interface';
import { MarkNotificationReadCommand } from '../commands/mark-notification-read.command';

@Injectable()
export class MarkNotificationReadHandler {
  constructor(
    @Inject(NOTIFICATION_REPOSITORY_TOKEN)
    private readonly repo: INotificationRepository,
  ) {}

  async execute(command: MarkNotificationReadCommand): Promise<{ count: number }> {
    const count = await this.repo.markAsRead(command.notificationIds, command.recipientId);
    return { count };
  }
}

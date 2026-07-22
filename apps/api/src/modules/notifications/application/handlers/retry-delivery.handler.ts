import { Injectable, Inject } from '@nestjs/common';
import { NOTIFICATION_REPOSITORY_TOKEN } from '../../constants/notifications.constants';
import { INotificationRepository } from '../../repositories/notification.repository.interface';
import { RetryDeliveryCommand } from '../commands/retry-delivery.command';
import { NotificationDeliveryService } from '../services/notification-delivery.service';
import { NotificationNotFoundException } from '../../domain/exceptions/notification-exceptions';

@Injectable()
export class RetryDeliveryHandler {
  constructor(
    @Inject(NOTIFICATION_REPOSITORY_TOKEN)
    private readonly repo: INotificationRepository,
    private readonly deliveryService: NotificationDeliveryService,
  ) {}

  async execute(command: RetryDeliveryCommand): Promise<{ success: boolean }> {
    const logs = await this.repo.findDeliveryLogs();
    const targetLog = logs.find((l) => l.id === command.deliveryLogId);
    if (!targetLog) {
      throw new NotificationNotFoundException(command.deliveryLogId);
    }

    const notification = await this.repo.findNotificationById(targetLog.notificationId);
    if (!notification) {
      throw new NotificationNotFoundException(targetLog.notificationId);
    }

    await this.deliveryService.dispatch(notification);
    return { success: true };
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { NOTIFICATION_REPOSITORY_TOKEN, NotificationChannel, NotificationPriority, TargetAudienceRole, DeliveryStatus } from '../../constants/notifications.constants';
import { INotificationRepository } from '../../repositories/notification.repository.interface';
import { SendNotificationCommand } from '../commands/send-notification.command';
import { NotificationResponseDto } from '../dtos/notification-response.dto';
import { NotificationMapper } from '../mappers/notification.mapper';
import { NotificationDeliveryService } from '../services/notification-delivery.service';
import { NotificationSentEvent } from '../../domain/events/notification-sent.event';
import { EventDispatcher } from '@vedhkrit/events';

@Injectable()
export class SendNotificationHandler {
  constructor(
    @Inject(NOTIFICATION_REPOSITORY_TOKEN)
    private readonly repo: INotificationRepository,
    private readonly deliveryService: NotificationDeliveryService,
    private readonly eventDispatcher: EventDispatcher,
  ) {}

  async execute(command: SendNotificationCommand): Promise<NotificationResponseDto> {
    const notification = await this.repo.createNotification({
      organizationId: command.dto.organizationId,
      tenantId: command.dto.tenantId,
      recipientId: command.dto.recipientId,
      recipientRole: command.dto.recipientRole || TargetAudienceRole.STUDENT,
      type: command.dto.type,
      title: command.dto.title,
      body: command.dto.body,
      actionUrl: command.dto.actionUrl,
      channel: command.dto.channel || NotificationChannel.IN_APP,
      priority: command.dto.priority || NotificationPriority.MEDIUM,
      status: DeliveryStatus.PENDING,
      scheduledFor: command.dto.scheduledFor ? new Date(command.dto.scheduledFor) : undefined,
    });

    try {
      await this.deliveryService.dispatch(notification);
    } catch {
      // Deferred due to quiet hours or retry scheduling
    }

    const updated = await this.repo.findNotificationById(notification.id);
    const finalNotif = updated || notification;

    if (finalNotif.status === DeliveryStatus.DELIVERED) {
      await this.eventDispatcher.publish(
        new NotificationSentEvent(
          finalNotif.id,
          finalNotif.recipientId,
          finalNotif.channel,
          finalNotif.type,
          new Date(),
        ),
      );
    }

    return NotificationMapper.toNotificationDto(finalNotif);
  }
}

import { Injectable, Logger, Inject } from '@nestjs/common';
import { NOTIFICATION_REPOSITORY_TOKEN, NotificationChannel, DeliveryStatus, NotificationPriority } from '../../constants/notifications.constants';
import { INotificationRepository } from '../../repositories/notification.repository.interface';
import { InAppChannel } from '../../infrastructure/channels/in-app.channel';
import { EmailChannel } from '../../infrastructure/channels/email.channel';
import { SmsChannel } from '../../infrastructure/channels/sms.channel';
import { WhatsAppChannel } from '../../infrastructure/channels/whatsapp.channel';
import { PushChannel } from '../../infrastructure/channels/push.channel';
import { WebSocketChannel } from '../../infrastructure/channels/websocket.channel';
import { NotificationEntity } from '../../domain/entities/notification.entity';
import { QuietHoursActiveException } from '../../domain/exceptions/notification-exceptions';

@Injectable()
export class NotificationDeliveryService {
  private readonly logger = new Logger(NotificationDeliveryService.name);

  constructor(
    @Inject(NOTIFICATION_REPOSITORY_TOKEN)
    private readonly repo: INotificationRepository,
    private readonly inAppChannel: InAppChannel,
    private readonly emailChannel: EmailChannel,
    private readonly smsChannel: SmsChannel,
    private readonly whatsAppChannel: WhatsAppChannel,
    private readonly pushChannel: PushChannel,
    private readonly webSocketChannel: WebSocketChannel,
  ) {}

  async dispatch(notification: NotificationEntity): Promise<void> {
    this.logger.log(`[Delivery Engine] Processing notification ${notification.id} via channel ${notification.channel}`);

    // Check user quiet hours for LOW / MEDIUM priority notifications
    const pref = await this.repo.findPreferenceByUserId(notification.recipientId);
    if (pref && pref.quietHoursStart && pref.quietHoursEnd) {
      if (this.isInQuietHours(pref.quietHoursStart, pref.quietHoursEnd) && notification.priority !== NotificationPriority.URGENT) {
        this.logger.warn(`[Delivery Engine] Deferred notification ${notification.id} for user ${notification.recipientId} during quiet hours`);
        throw new QuietHoursActiveException(notification.recipientId, `${pref.quietHoursStart}-${pref.quietHoursEnd}`);
      }
    }

    const payload = {
      notificationId: notification.id,
      recipientId: notification.recipientId,
      channel: notification.channel,
      title: notification.title,
      body: notification.body,
      actionUrl: notification.actionUrl || undefined,
      metadata: notification.metadata,
    };

    let result: { success: boolean; providerMsgId?: string } = { success: false };
    let providerName = 'INTERNAL';

    try {
      switch (notification.channel) {
        case NotificationChannel.IN_APP:
          providerName = 'IN_APP_DB';
          result = await this.inAppChannel.send(payload);
          break;
        case NotificationChannel.EMAIL:
          providerName = 'SENDGRID_EMAIL';
          result = await this.emailChannel.send(payload);
          break;
        case NotificationChannel.SMS:
          providerName = 'TWILIO_SMS';
          result = await this.smsChannel.send(payload);
          break;
        case NotificationChannel.WHATSAPP:
          providerName = 'META_WHATSAPP_API';
          result = await this.whatsAppChannel.send(payload);
          break;
        case NotificationChannel.PUSH:
          providerName = 'FCM_PUSH';
          result = await this.pushChannel.send(payload);
          break;
        case NotificationChannel.WEBSOCKET:
          providerName = 'SOCKET_IO';
          result = await this.webSocketChannel.send(payload);
          break;
      }

      if (result.success) {
        await this.repo.updateNotificationStatus(notification.id, DeliveryStatus.DELIVERED);
        await this.repo.createDeliveryLog({
          notificationId: notification.id,
          channel: notification.channel,
          status: DeliveryStatus.DELIVERED,
          provider: providerName,
          providerMsgId: result.providerMsgId,
          attemptCount: 1,
          sentAt: new Date(),
        });
      } else {
        await this.handleFailure(notification, providerName, 'Delivery returned unsuccessful status');
      }
    } catch (err: any) {
      await this.handleFailure(notification, providerName, err.message || 'Transmission exception');
    }
  }

  private async handleFailure(notification: NotificationEntity, provider: string, errorMessage: string): Promise<void> {
    this.logger.error(`[Delivery Engine] Delivery failed for ${notification.id}: ${errorMessage}`);

    await this.repo.updateNotificationStatus(notification.id, DeliveryStatus.FAILED);
    await this.repo.createDeliveryLog({
      notificationId: notification.id,
      channel: notification.channel,
      status: DeliveryStatus.FAILED,
      provider,
      errorMessage,
      attemptCount: 1,
      nextAttemptAt: new Date(Date.now() + 5 * 60 * 1000), // Retry in 5 minutes
    });
  }

  private isInQuietHours(startStr: string, endStr: string): boolean {
    const now = new Date();
    const currentHours = now.getHours();
    const start = parseInt(startStr.split(':')[0], 10) || 22;
    const end = parseInt(endStr.split(':')[0], 10) || 7;

    if (start > end) {
      return currentHours >= start || currentHours < end;
    }
    return currentHours >= start && currentHours < end;
  }
}

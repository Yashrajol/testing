import { Provider } from '@nestjs/common';
import { NOTIFICATION_REPOSITORY_TOKEN } from './constants/notifications.constants';
import { NotificationRepository } from './repositories/notification.repository';
import { InAppChannel } from './infrastructure/channels/in-app.channel';
import { EmailChannel } from './infrastructure/channels/email.channel';
import { SmsChannel } from './infrastructure/channels/sms.channel';
import { WhatsAppChannel } from './infrastructure/channels/whatsapp.channel';
import { PushChannel } from './infrastructure/channels/push.channel';
import { WebSocketChannel } from './infrastructure/channels/websocket.channel';
import { NotificationsWebSocketGateway } from './infrastructure/gateways/notifications.websocket-gateway';
import { NotificationDeliveryService } from './application/services/notification-delivery.service';
import { NotificationEventListenerService } from './application/services/notification-event-listener.service';
import { SendNotificationHandler } from './application/handlers/send-notification.handler';
import { MarkNotificationReadHandler } from './application/handlers/mark-notification-read.handler';
import { CreateTemplateHandler } from './application/handlers/create-template.handler';
import { UpdateTemplateHandler } from './application/handlers/update-template.handler';
import { CreateAnnouncementHandler } from './application/handlers/create-announcement.handler';
import { PublishAnnouncementHandler } from './application/handlers/publish-announcement.handler';
import { DeleteAnnouncementHandler } from './application/handlers/delete-announcement.handler';
import { UpdatePreferenceHandler } from './application/handlers/update-preference.handler';
import { RetryDeliveryHandler } from './application/handlers/retry-delivery.handler';
import { GetUserNotificationsHandler } from './application/handlers/get-user-notifications.handler';
import { GetTemplateHandler } from './application/handlers/get-template.handler';
import { GetAnnouncementsHandler } from './application/handlers/get-announcements.handler';
import { GetUserPreferencesHandler } from './application/handlers/get-user-preferences.handler';
import { GetDeliveryLogsHandler } from './application/handlers/get-delivery-logs.handler';

export const notificationsProviders: Provider[] = [
  {
    provide: NOTIFICATION_REPOSITORY_TOKEN,
    useClass: NotificationRepository,
  },
  InAppChannel,
  EmailChannel,
  SmsChannel,
  WhatsAppChannel,
  PushChannel,
  WebSocketChannel,
  NotificationsWebSocketGateway,
  NotificationDeliveryService,
  NotificationEventListenerService,
  SendNotificationHandler,
  MarkNotificationReadHandler,
  CreateTemplateHandler,
  UpdateTemplateHandler,
  CreateAnnouncementHandler,
  PublishAnnouncementHandler,
  DeleteAnnouncementHandler,
  UpdatePreferenceHandler,
  RetryDeliveryHandler,
  GetUserNotificationsHandler,
  GetTemplateHandler,
  GetAnnouncementsHandler,
  GetUserPreferencesHandler,
  GetDeliveryLogsHandler,
];

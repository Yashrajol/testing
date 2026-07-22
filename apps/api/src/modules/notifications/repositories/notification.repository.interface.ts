import { NotificationEntity } from '../domain/entities/notification.entity';
import { NotificationTemplateEntity } from '../domain/entities/notification-template.entity';
import { NotificationPreferenceEntity } from '../domain/entities/notification-preference.entity';
import { AnnouncementEntity } from '../domain/entities/announcement.entity';
import { DeliveryLogEntity } from '../domain/entities/delivery-log.entity';
import { NotificationFilterOptions, AnnouncementFilterOptions } from '../types/notifications.types';
import { DeliveryStatus } from '../constants/notifications.constants';

export interface INotificationRepository {
  createNotification(data: any): Promise<NotificationEntity>;
  updateNotificationStatus(id: string, status: DeliveryStatus): Promise<NotificationEntity>;
  findNotificationById(id: string): Promise<NotificationEntity | null>;
  findNotifications(options?: NotificationFilterOptions): Promise<NotificationEntity[]>;
  markAsRead(ids: string[], recipientId: string): Promise<number>;

  createTemplate(data: any): Promise<NotificationTemplateEntity>;
  updateTemplate(id: string, data: any): Promise<NotificationTemplateEntity>;
  findTemplateByCode(code: string): Promise<NotificationTemplateEntity | null>;
  findTemplates(): Promise<NotificationTemplateEntity[]>;

  upsertPreference(userId: string, data: any): Promise<NotificationPreferenceEntity>;
  findPreferenceByUserId(userId: string): Promise<NotificationPreferenceEntity | null>;

  createAnnouncement(data: any): Promise<AnnouncementEntity>;
  publishAnnouncement(id: string): Promise<AnnouncementEntity>;
  deleteAnnouncement(id: string): Promise<void>;
  findAnnouncements(options?: AnnouncementFilterOptions): Promise<AnnouncementEntity[]>;

  createDeliveryLog(data: any): Promise<DeliveryLogEntity>;
  findDeliveryLogs(notificationId?: string): Promise<DeliveryLogEntity[]>;
}

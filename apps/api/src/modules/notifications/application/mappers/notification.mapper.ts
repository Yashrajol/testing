import { NotificationEntity } from '../../domain/entities/notification.entity';
import { NotificationTemplateEntity } from '../../domain/entities/notification-template.entity';
import { NotificationPreferenceEntity } from '../../domain/entities/notification-preference.entity';
import { AnnouncementEntity } from '../../domain/entities/announcement.entity';
import { DeliveryLogEntity } from '../../domain/entities/delivery-log.entity';
import {
  NotificationResponseDto,
  TemplateResponseDto,
  PreferenceResponseDto,
  AnnouncementResponseDto,
  DeliveryLogResponseDto,
} from '../dtos/notification-response.dto';

export class NotificationMapper {
  static toNotificationDto(entity: NotificationEntity): NotificationResponseDto {
    return {
      id: entity.id,
      recipientId: entity.recipientId,
      recipientRole: entity.recipientRole,
      type: entity.type,
      title: entity.title,
      body: entity.body,
      actionUrl: entity.actionUrl || null,
      channel: entity.channel,
      priority: entity.priority,
      status: entity.status,
      isRead: entity.isRead,
      readAt: entity.readAt || null,
      createdAt: entity.createdAt,
    };
  }

  static toTemplateDto(entity: NotificationTemplateEntity): TemplateResponseDto {
    return {
      id: entity.id,
      code: entity.code,
      name: entity.name,
      type: entity.type,
      channel: entity.channel,
      subject: entity.subject || null,
      htmlBody: entity.htmlBody || null,
      isActive: entity.isActive,
      language: entity.language,
    };
  }

  static toPreferenceDto(entity: NotificationPreferenceEntity): PreferenceResponseDto {
    return {
      id: entity.id,
      userId: entity.userId,
      enabledChannels: entity.enabledChannels || null,
      quietHoursStart: entity.quietHoursStart || null,
      quietHoursEnd: entity.quietHoursEnd || null,
      minPriority: entity.minPriority,
      preferredLanguage: entity.preferredLanguage,
    };
  }

  static toAnnouncementDto(entity: AnnouncementEntity): AnnouncementResponseDto {
    return {
      id: entity.id,
      title: entity.title,
      content: entity.content,
      targetRole: entity.targetRole,
      authorId: entity.authorId,
      isPublished: entity.isPublished,
      createdAt: entity.createdAt,
    };
  }

  static toDeliveryLogDto(entity: DeliveryLogEntity): DeliveryLogResponseDto {
    return {
      id: entity.id,
      notificationId: entity.notificationId,
      channel: entity.channel,
      status: entity.status,
      provider: entity.provider || null,
      providerMsgId: entity.providerMsgId || null,
      errorMessage: entity.errorMessage || null,
      attemptCount: entity.attemptCount,
      createdAt: entity.createdAt,
    };
  }
}

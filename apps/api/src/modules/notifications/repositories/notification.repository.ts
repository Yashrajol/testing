import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vedhkrit/database';
import { INotificationRepository } from './notification.repository.interface';
import { NotificationEntity } from '../domain/entities/notification.entity';
import { NotificationTemplateEntity } from '../domain/entities/notification-template.entity';
import { NotificationPreferenceEntity } from '../domain/entities/notification-preference.entity';
import { AnnouncementEntity } from '../domain/entities/announcement.entity';
import { DeliveryLogEntity } from '../domain/entities/delivery-log.entity';
import { NotificationFilterOptions, AnnouncementFilterOptions } from '../types/notifications.types';
import { DeliveryStatus, NotificationChannel, NotificationType, NotificationPriority, TargetAudienceRole } from '../constants/notifications.constants';

@Injectable()
export class NotificationRepository implements INotificationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createNotification(data: any): Promise<NotificationEntity> {
    const raw = await this.prisma.notification.create({ data });
    return this.mapNotification(raw);
  }

  async updateNotificationStatus(id: string, status: DeliveryStatus): Promise<NotificationEntity> {
    const raw = await this.prisma.notification.update({
      where: { id },
      data: { status },
    });
    return this.mapNotification(raw);
  }

  async findNotificationById(id: string): Promise<NotificationEntity | null> {
    const raw = await this.prisma.notification.findFirst({
      where: { id, deletedAt: null },
    });
    return raw ? this.mapNotification(raw) : null;
  }

  async findNotifications(options?: NotificationFilterOptions): Promise<NotificationEntity[]> {
    const where: any = { deletedAt: null };
    if (options?.organizationId) where.organizationId = options.organizationId;
    if (options?.tenantId) where.tenantId = options.tenantId;
    if (options?.recipientId) where.recipientId = options.recipientId;
    if (options?.recipientRole) where.recipientRole = options.recipientRole;
    if (options?.channel) where.channel = options.channel;
    if (options?.type) where.type = options.type;
    if (options?.status) where.status = options.status;
    if (options?.isRead !== undefined) where.isRead = options.isRead;

    const raws = await this.prisma.notification.findMany({
      where,
      skip: options?.skip,
      take: options?.take,
      orderBy: { createdAt: 'desc' },
    });

    return raws.map((r) => this.mapNotification(r));
  }

  async markAsRead(ids: string[], recipientId: string): Promise<number> {
    const result = await this.prisma.notification.updateMany({
      where: { id: { in: ids }, recipientId, deletedAt: null },
      data: { isRead: true, readAt: new Date(), status: DeliveryStatus.READ },
    });
    return result.count;
  }

  async createTemplate(data: any): Promise<NotificationTemplateEntity> {
    const raw = await this.prisma.notificationTemplate.create({ data });
    return this.mapTemplate(raw);
  }

  async updateTemplate(id: string, data: any): Promise<NotificationTemplateEntity> {
    const raw = await this.prisma.notificationTemplate.update({
      where: { id },
      data,
    });
    return this.mapTemplate(raw);
  }

  async findTemplateByCode(code: string): Promise<NotificationTemplateEntity | null> {
    const raw = await this.prisma.notificationTemplate.findFirst({
      where: { OR: [{ code }, { id: code }], deletedAt: null },
    });
    return raw ? this.mapTemplate(raw) : null;
  }

  async findTemplates(): Promise<NotificationTemplateEntity[]> {
    const raws = await this.prisma.notificationTemplate.findMany({
      where: { deletedAt: null },
    });
    return raws.map((r) => this.mapTemplate(r));
  }

  async upsertPreference(userId: string, data: any): Promise<NotificationPreferenceEntity> {
    const raw = await this.prisma.notificationPreference.upsert({
      where: { userId },
      create: { userId, ...data },
      update: data,
    });
    return this.mapPreference(raw);
  }

  async findPreferenceByUserId(userId: string): Promise<NotificationPreferenceEntity | null> {
    const raw = await this.prisma.notificationPreference.findFirst({
      where: { userId, deletedAt: null },
    });
    return raw ? this.mapPreference(raw) : null;
  }

  async createAnnouncement(data: any): Promise<AnnouncementEntity> {
    const raw = await this.prisma.announcement.create({ data });
    return this.mapAnnouncement(raw);
  }

  async publishAnnouncement(id: string): Promise<AnnouncementEntity> {
    const raw = await this.prisma.announcement.update({
      where: { id },
      data: { isPublished: true, publishedAt: new Date() },
    });
    return this.mapAnnouncement(raw);
  }

  async deleteAnnouncement(id: string): Promise<void> {
    await this.prisma.announcement.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async findAnnouncements(options?: AnnouncementFilterOptions): Promise<AnnouncementEntity[]> {
    const where: any = { deletedAt: null };
    if (options?.organizationId) where.organizationId = options.organizationId;
    if (options?.schoolId) where.schoolId = options.schoolId;
    if (options?.classId) where.classId = options.classId;
    if (options?.batchId) where.batchId = options.batchId;
    if (options?.targetRole) where.targetRole = options.targetRole;
    if (options?.targetUserId) where.targetUserId = options.targetUserId;
    if (options?.isPublished !== undefined) where.isPublished = options.isPublished;

    const raws = await this.prisma.announcement.findMany({
      where,
      skip: options?.skip,
      take: options?.take,
      orderBy: { createdAt: 'desc' },
    });

    return raws.map((r) => this.mapAnnouncement(r));
  }

  async createDeliveryLog(data: any): Promise<DeliveryLogEntity> {
    const raw = await this.prisma.deliveryLog.create({ data });
    return this.mapDeliveryLog(raw);
  }

  async findDeliveryLogs(notificationId?: string): Promise<DeliveryLogEntity[]> {
    const where: any = {};
    if (notificationId) where.notificationId = notificationId;

    const raws = await this.prisma.deliveryLog.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return raws.map((r) => this.mapDeliveryLog(r));
  }

  private mapNotification(raw: any): NotificationEntity {
    return new NotificationEntity({
      id: raw.id,
      organizationId: raw.organizationId,
      tenantId: raw.tenantId,
      recipientId: raw.recipientId,
      recipientRole: raw.recipientRole as TargetAudienceRole,
      type: raw.type as NotificationType,
      title: raw.title,
      body: raw.body,
      actionUrl: raw.actionUrl,
      channel: raw.channel as NotificationChannel,
      priority: raw.priority as NotificationPriority,
      status: raw.status as DeliveryStatus,
      isRead: raw.isRead,
      readAt: raw.readAt,
      scheduledFor: raw.scheduledFor,
      metadata: raw.metadata,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: raw.deletedAt,
    });
  }

  private mapTemplate(raw: any): NotificationTemplateEntity {
    return new NotificationTemplateEntity({
      id: raw.id,
      code: raw.code,
      name: raw.name,
      type: raw.type as NotificationType,
      channel: raw.channel as NotificationChannel,
      subject: raw.subject,
      htmlBody: raw.htmlBody,
      textBody: raw.textBody,
      pushTitle: raw.pushTitle,
      whatsappBody: raw.whatsappBody,
      smsBody: raw.smsBody,
      variables: raw.variables,
      language: raw.language,
      isActive: raw.isActive,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: raw.deletedAt,
    });
  }

  private mapPreference(raw: any): NotificationPreferenceEntity {
    return new NotificationPreferenceEntity({
      id: raw.id,
      userId: raw.userId,
      enabledChannels: raw.enabledChannels,
      categoryPreferences: raw.categoryPreferences,
      quietHoursStart: raw.quietHoursStart,
      quietHoursEnd: raw.quietHoursEnd,
      minPriority: raw.minPriority as NotificationPriority,
      preferredLanguage: raw.preferredLanguage,
      frequency: raw.frequency,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: raw.deletedAt,
    });
  }

  private mapAnnouncement(raw: any): AnnouncementEntity {
    return new AnnouncementEntity({
      id: raw.id,
      organizationId: raw.organizationId,
      schoolId: raw.schoolId,
      classId: raw.classId,
      batchId: raw.batchId,
      courseId: raw.courseId,
      targetRole: raw.targetRole as TargetAudienceRole,
      targetUserId: raw.targetUserId,
      title: raw.title,
      content: raw.content,
      authorId: raw.authorId,
      isPublished: raw.isPublished,
      publishedAt: raw.publishedAt,
      expiresAt: raw.expiresAt,
      attachments: raw.attachments,
      metadata: raw.metadata,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: raw.deletedAt,
    });
  }

  private mapDeliveryLog(raw: any): DeliveryLogEntity {
    return new DeliveryLogEntity({
      id: raw.id,
      notificationId: raw.notificationId,
      channel: raw.channel as NotificationChannel,
      status: raw.status as DeliveryStatus,
      provider: raw.provider,
      providerMsgId: raw.providerMsgId,
      errorMessage: raw.errorMessage,
      attemptCount: raw.attemptCount,
      nextAttemptAt: raw.nextAttemptAt,
      sentAt: raw.sentAt,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }
}

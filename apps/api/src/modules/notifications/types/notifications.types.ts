import { NotificationChannel, NotificationType, NotificationPriority, DeliveryStatus, TargetAudienceRole } from '../constants/notifications.constants';

export interface NotificationFilterOptions {
  organizationId?: string;
  tenantId?: string;
  recipientId?: string;
  recipientRole?: TargetAudienceRole;
  channel?: NotificationChannel;
  type?: NotificationType;
  status?: DeliveryStatus;
  isRead?: boolean;
  skip?: number;
  take?: number;
}

export interface AnnouncementFilterOptions {
  organizationId?: string;
  schoolId?: string;
  classId?: string;
  batchId?: string;
  courseId?: string;
  targetRole?: TargetAudienceRole;
  targetUserId?: string;
  isPublished?: boolean;
  skip?: number;
  take?: number;
}

export interface RenderedTemplate {
  subject?: string;
  body: string;
  htmlBody?: string;
  pushTitle?: string;
}

export interface DispatchChannelPayload {
  notificationId: string;
  recipientId: string;
  channel: NotificationChannel;
  title: string;
  body: string;
  actionUrl?: string;
  metadata?: any;
}

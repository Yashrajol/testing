import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { NotificationChannel, NotificationType, NotificationPriority, DeliveryStatus, TargetAudienceRole } from '../../constants/notifications.constants';

export class DeliveryLogResponseDto {
  @ApiProperty({ example: 'log-uuid-123' })
  id!: string;

  @ApiProperty({ example: 'notif-uuid-123' })
  notificationId!: string;

  @ApiProperty({ enum: NotificationChannel, example: NotificationChannel.EMAIL })
  channel!: NotificationChannel;

  @ApiProperty({ enum: DeliveryStatus, example: DeliveryStatus.DELIVERED })
  status!: DeliveryStatus;

  @ApiPropertyOptional({ example: 'SENDGRID' })
  provider?: string | null;

  @ApiPropertyOptional({ example: 'msg-id-456' })
  providerMsgId?: string | null;

  @ApiPropertyOptional({ example: 'Connection timeout' })
  errorMessage?: string | null;

  @ApiProperty({ example: 1 })
  attemptCount!: number;

  @ApiProperty({ example: '2026-07-21T10:00:00.000Z' })
  createdAt!: Date;
}

export class NotificationResponseDto {
  @ApiProperty({ example: 'notif-uuid-123' })
  id!: string;

  @ApiProperty({ example: 'user-uuid-123' })
  recipientId!: string;

  @ApiProperty({ enum: TargetAudienceRole, example: TargetAudienceRole.STUDENT })
  recipientRole!: TargetAudienceRole;

  @ApiProperty({ enum: NotificationType, example: NotificationType.ASSIGNMENT_GRADED })
  type!: NotificationType;

  @ApiProperty({ example: 'Assignment Graded' })
  title!: string;

  @ApiProperty({ example: 'You scored 95/100 on Full Stack Capstone Project.' })
  body!: string;

  @ApiPropertyOptional({ example: 'https://vedhkrit.com/dashboard/student/assignments/123' })
  actionUrl?: string | null;

  @ApiProperty({ enum: NotificationChannel, example: NotificationChannel.IN_APP })
  channel!: NotificationChannel;

  @ApiProperty({ enum: NotificationPriority, example: NotificationPriority.HIGH })
  priority!: NotificationPriority;

  @ApiProperty({ enum: DeliveryStatus, example: DeliveryStatus.DELIVERED })
  status!: DeliveryStatus;

  @ApiProperty({ example: false })
  isRead!: boolean;

  @ApiPropertyOptional({ example: '2026-07-21T10:05:00.000Z' })
  readAt?: Date | null;

  @ApiProperty({ example: '2026-07-21T10:00:00.000Z' })
  createdAt!: Date;
}

export class TemplateResponseDto {
  @ApiProperty({ example: 'tmpl-uuid-123' })
  id!: string;

  @ApiProperty({ example: 'TMPL_ASSIGNMENT_CREATED' })
  code!: string;

  @ApiProperty({ example: 'Assignment Created Template' })
  name!: string;

  @ApiProperty({ enum: NotificationType, example: NotificationType.ASSIGNMENT_CREATED })
  type!: NotificationType;

  @ApiProperty({ enum: NotificationChannel, example: NotificationChannel.EMAIL })
  channel!: NotificationChannel;

  @ApiPropertyOptional({ example: 'New Assignment: {{title}}' })
  subject?: string | null;

  @ApiPropertyOptional({ example: '<p>{{body}}</p>' })
  htmlBody?: string | null;

  @ApiProperty({ example: true })
  isActive!: boolean;

  @ApiProperty({ example: 'en' })
  language!: string;
}

export class PreferenceResponseDto {
  @ApiProperty({ example: 'pref-uuid-123' })
  id!: string;

  @ApiProperty({ example: 'user-uuid-123' })
  userId!: string;

  @ApiPropertyOptional({ example: { IN_APP: true, EMAIL: true, SMS: false } })
  enabledChannels?: any;

  @ApiPropertyOptional({ example: '22:00' })
  quietHoursStart?: string | null;

  @ApiPropertyOptional({ example: '07:00' })
  quietHoursEnd?: string | null;

  @ApiProperty({ enum: NotificationPriority, example: NotificationPriority.LOW })
  minPriority!: NotificationPriority;

  @ApiProperty({ example: 'en' })
  preferredLanguage!: string;
}

export class AnnouncementResponseDto {
  @ApiProperty({ example: 'ann-uuid-123' })
  id!: string;

  @ApiProperty({ example: 'Annual Tech Symposium' })
  title!: string;

  @ApiProperty({ example: 'Registration is now open.' })
  content!: string;

  @ApiProperty({ enum: TargetAudienceRole, example: TargetAudienceRole.ALL })
  targetRole!: TargetAudienceRole;

  @ApiProperty({ example: 'teacher-uuid-123' })
  authorId!: string;

  @ApiProperty({ example: true })
  isPublished!: boolean;

  @ApiProperty({ example: '2026-07-21T10:00:00.000Z' })
  createdAt!: Date;
}

import { IsArray, IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { NotificationChannel, NotificationType, NotificationPriority, TargetAudienceRole } from '../../constants/notifications.constants';

export class SendNotificationDto {
  @ApiPropertyOptional({ example: 'org-uuid-123' })
  @IsOptional()
  @IsString()
  organizationId?: string;

  @ApiPropertyOptional({ example: 'tenant-uuid-123' })
  @IsOptional()
  @IsString()
  tenantId?: string;

  @ApiProperty({ example: 'user-uuid-123' })
  @IsString()
  @IsNotEmpty()
  recipientId!: string;

  @ApiPropertyOptional({ enum: TargetAudienceRole, example: TargetAudienceRole.STUDENT })
  @IsOptional()
  @IsEnum(TargetAudienceRole)
  recipientRole?: TargetAudienceRole;

  @ApiProperty({ enum: NotificationType, example: NotificationType.ASSIGNMENT_GRADED })
  @IsEnum(NotificationType)
  type!: NotificationType;

  @ApiProperty({ example: 'Your Assignment Has Been Graded' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ example: 'You scored 95/100 on Full Stack Capstone Project.' })
  @IsString()
  @IsNotEmpty()
  body!: string;

  @ApiPropertyOptional({ example: 'https://vedhkrit.com/dashboard/student/assignments/123' })
  @IsOptional()
  @IsString()
  actionUrl?: string;

  @ApiPropertyOptional({ enum: NotificationChannel, example: NotificationChannel.IN_APP })
  @IsOptional()
  @IsEnum(NotificationChannel)
  channel?: NotificationChannel;

  @ApiPropertyOptional({ enum: NotificationPriority, example: NotificationPriority.HIGH })
  @IsOptional()
  @IsEnum(NotificationPriority)
  priority?: NotificationPriority;

  @ApiPropertyOptional({ example: '2026-08-01T10:00:00Z' })
  @IsOptional()
  @IsDateString()
  scheduledFor?: string;
}

export class MarkReadDto {
  @ApiProperty({ example: ['notif-uuid-1', 'notif-uuid-2'] })
  @IsArray()
  notificationIds!: string[];
}

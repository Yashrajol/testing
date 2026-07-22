import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { NotificationPriority } from '../../constants/notifications.constants';

export class UpdatePreferenceDto {
  @ApiPropertyOptional({ example: { IN_APP: true, EMAIL: true, SMS: false, WHATSAPP: true, PUSH: true } })
  @IsOptional()
  enabledChannels?: Record<string, boolean>;

  @ApiPropertyOptional({ example: { ASSIGNMENT_CREATED: true, ATTENDANCE_ALERT: true } })
  @IsOptional()
  categoryPreferences?: Record<string, boolean>;

  @ApiPropertyOptional({ example: '22:00' })
  @IsOptional()
  @IsString()
  quietHoursStart?: string;

  @ApiPropertyOptional({ example: '07:00' })
  @IsOptional()
  @IsString()
  quietHoursEnd?: string;

  @ApiPropertyOptional({ enum: NotificationPriority, example: NotificationPriority.MEDIUM })
  @IsOptional()
  @IsEnum(NotificationPriority)
  minPriority?: NotificationPriority;

  @ApiPropertyOptional({ example: 'en' })
  @IsOptional()
  @IsString()
  preferredLanguage?: string;

  @ApiPropertyOptional({ example: 'IMMEDIATE' })
  @IsOptional()
  @IsString()
  frequency?: string;
}

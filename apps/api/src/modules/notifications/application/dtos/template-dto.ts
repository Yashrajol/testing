import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { NotificationChannel, NotificationType } from '../../constants/notifications.constants';

export class CreateTemplateDto {
  @ApiProperty({ example: 'TMPL_ASSIGNMENT_CREATED' })
  @IsString()
  @IsNotEmpty()
  code!: string;

  @ApiProperty({ example: 'Assignment Created Template' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ enum: NotificationType, example: NotificationType.ASSIGNMENT_CREATED })
  @IsEnum(NotificationType)
  type!: NotificationType;

  @ApiProperty({ enum: NotificationChannel, example: NotificationChannel.EMAIL })
  @IsEnum(NotificationChannel)
  channel!: NotificationChannel;

  @ApiPropertyOptional({ example: 'New Assignment: {{title}}' })
  @IsOptional()
  @IsString()
  subject?: string;

  @ApiPropertyOptional({ example: '<h1>New Assignment Posted</h1><p>{{title}} is due on {{dueDate}}.</p>' })
  @IsOptional()
  @IsString()
  htmlBody?: string;

  @ApiPropertyOptional({ example: 'New Assignment Posted: {{title}} due on {{dueDate}}.' })
  @IsOptional()
  @IsString()
  textBody?: string;

  @ApiPropertyOptional({ example: 'New Assignment Assigned' })
  @IsOptional()
  @IsString()
  pushTitle?: string;

  @ApiPropertyOptional({ example: 'Hello {{studentName}}, new assignment {{title}} is posted.' })
  @IsOptional()
  @IsString()
  whatsappBody?: string;

  @ApiPropertyOptional({ example: 'Vedhkrit: New assignment {{title}} assigned. Check app for details.' })
  @IsOptional()
  @IsString()
  smsBody?: string;

  @ApiPropertyOptional({ example: ['studentName', 'title', 'dueDate'] })
  @IsOptional()
  variables?: any;

  @ApiPropertyOptional({ example: 'en' })
  @IsOptional()
  @IsString()
  language?: string;
}

export class UpdateTemplateDto {
  @ApiPropertyOptional({ example: 'Updated Template Name' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'Updated Subject Line {{title}}' })
  @IsOptional()
  @IsString()
  subject?: string;

  @ApiPropertyOptional({ example: 'Updated body text {{title}}' })
  @IsOptional()
  @IsString()
  htmlBody?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

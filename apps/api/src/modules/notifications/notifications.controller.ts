import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SendNotificationDto, MarkReadDto } from './application/dtos/notification-request.dto';
import { CreateTemplateDto, UpdateTemplateDto } from './application/dtos/template-dto';
import { CreateAnnouncementDto } from './application/dtos/announcement-dto';
import { UpdatePreferenceDto } from './application/dtos/preference-dto';
import {
  NotificationResponseDto,
  TemplateResponseDto,
  AnnouncementResponseDto,
  PreferenceResponseDto,
  DeliveryLogResponseDto,
} from './application/dtos/notification-response.dto';

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

import { SendNotificationCommand } from './application/commands/send-notification.command';
import { MarkNotificationReadCommand } from './application/commands/mark-notification-read.command';
import { CreateTemplateCommand } from './application/commands/create-template.command';
import { UpdateTemplateCommand } from './application/commands/update-template.command';
import { CreateAnnouncementCommand } from './application/commands/create-announcement.command';
import { PublishAnnouncementCommand } from './application/commands/publish-announcement.command';
import { DeleteAnnouncementCommand } from './application/commands/delete-announcement.command';
import { UpdatePreferenceCommand } from './application/commands/update-preference.command';
import { RetryDeliveryCommand } from './application/commands/retry-delivery.command';

import { GetUserNotificationsQuery } from './application/queries/get-user-notifications.query';
import { GetTemplateQuery } from './application/queries/get-template.query';
import { GetAnnouncementsQuery } from './application/queries/get-announcements.query';
import { GetUserPreferencesQuery } from './application/queries/get-user-preferences.query';
import { GetDeliveryLogsQuery } from './application/queries/get-delivery-logs.query';
import { NotificationChannel, NotificationType, DeliveryStatus, TargetAudienceRole } from './constants/notifications.constants';

@ApiTags('Notification & Communication Platform')
@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly sendNotificationHandler: SendNotificationHandler,
    private readonly markNotificationReadHandler: MarkNotificationReadHandler,
    private readonly createTemplateHandler: CreateTemplateHandler,
    private readonly updateTemplateHandler: UpdateTemplateHandler,
    private readonly createAnnouncementHandler: CreateAnnouncementHandler,
    private readonly publishAnnouncementHandler: PublishAnnouncementHandler,
    private readonly deleteAnnouncementHandler: DeleteAnnouncementHandler,
    private readonly updatePreferenceHandler: UpdatePreferenceHandler,
    private readonly retryDeliveryHandler: RetryDeliveryHandler,
    private readonly getUserNotificationsHandler: GetUserNotificationsHandler,
    private readonly getTemplateHandler: GetTemplateHandler,
    private readonly getAnnouncementsHandler: GetAnnouncementsHandler,
    private readonly getUserPreferencesHandler: GetUserPreferencesHandler,
    private readonly getDeliveryLogsHandler: GetDeliveryLogsHandler,
  ) {}

  // --- NOTIFICATIONS ---

  @Post()
  @ApiOperation({ summary: 'Send omnichannel notification' })
  @ApiResponse({ status: 201, type: NotificationResponseDto })
  async sendNotification(@Body() dto: SendNotificationDto): Promise<NotificationResponseDto> {
    return this.sendNotificationHandler.execute(new SendNotificationCommand(dto));
  }

  @Get('user/:recipientId')
  @ApiOperation({ summary: 'Get notifications for user' })
  @ApiResponse({ status: 200, type: [NotificationResponseDto] })
  async getUserNotifications(
    @Param('recipientId') recipientId: string,
    @Query('channel') channel?: NotificationChannel,
    @Query('type') type?: NotificationType,
    @Query('status') status?: DeliveryStatus,
    @Query('isRead') isRead?: boolean,
  ): Promise<NotificationResponseDto[]> {
    return this.getUserNotificationsHandler.execute(
      new GetUserNotificationsQuery(recipientId, { channel, type, status, isRead }),
    );
  }

  @Post('mark-read')
  @ApiOperation({ summary: 'Mark notifications as read' })
  async markRead(@Body() dto: MarkReadDto, @Query('recipientId') recipientId: string = 'USER_ID') {
    return this.markNotificationReadHandler.execute(
      new MarkNotificationReadCommand(dto.notificationIds, recipientId),
    );
  }

  // --- TEMPLATES ---

  @Post('templates')
  @ApiOperation({ summary: 'Create notification template' })
  @ApiResponse({ status: 201, type: TemplateResponseDto })
  async createTemplate(@Body() dto: CreateTemplateDto): Promise<TemplateResponseDto> {
    return this.createTemplateHandler.execute(new CreateTemplateCommand(dto));
  }

  @Patch('templates/:id')
  @ApiOperation({ summary: 'Update notification template' })
  @ApiResponse({ status: 200, type: TemplateResponseDto })
  async updateTemplate(@Param('id') id: string, @Body() dto: UpdateTemplateDto): Promise<TemplateResponseDto> {
    return this.updateTemplateHandler.execute(new UpdateTemplateCommand(id, dto));
  }

  @Get('templates/:codeOrId')
  @ApiOperation({ summary: 'Get notification template by code or ID' })
  @ApiResponse({ status: 200, type: TemplateResponseDto })
  async getTemplate(@Param('codeOrId') codeOrId: string): Promise<TemplateResponseDto> {
    return this.getTemplateHandler.execute(new GetTemplateQuery(codeOrId));
  }

  // --- ANNOUNCEMENTS ---

  @Post('announcements')
  @ApiOperation({ summary: 'Create targeted announcement' })
  @ApiResponse({ status: 201, type: AnnouncementResponseDto })
  async createAnnouncement(
    @Body() dto: CreateAnnouncementDto,
    @Query('authorId') authorId: string = 'ADMIN_ID',
  ): Promise<AnnouncementResponseDto> {
    return this.createAnnouncementHandler.execute(new CreateAnnouncementCommand(dto, authorId));
  }

  @Post('announcements/:id/publish')
  @ApiOperation({ summary: 'Publish announcement' })
  @ApiResponse({ status: 200, type: AnnouncementResponseDto })
  async publishAnnouncement(@Param('id') id: string): Promise<AnnouncementResponseDto> {
    return this.publishAnnouncementHandler.execute(new PublishAnnouncementCommand(id));
  }

  @Get('announcements')
  @ApiOperation({ summary: 'List announcements with filters' })
  @ApiResponse({ status: 200, type: [AnnouncementResponseDto] })
  async getAnnouncements(
    @Query('organizationId') organizationId?: string,
    @Query('schoolId') schoolId?: string,
    @Query('batchId') batchId?: string,
    @Query('targetRole') targetRole?: TargetAudienceRole,
  ): Promise<AnnouncementResponseDto[]> {
    return this.getAnnouncementsHandler.execute(
      new GetAnnouncementsQuery({ organizationId, schoolId, batchId, targetRole }),
    );
  }

  @Delete('announcements/:id')
  @ApiOperation({ summary: 'Delete announcement' })
  async deleteAnnouncement(@Param('id') id: string) {
    return this.deleteAnnouncementHandler.execute(new DeleteAnnouncementCommand(id));
  }

  // --- PREFERENCES ---

  @Get('preferences/:userId')
  @ApiOperation({ summary: 'Get user notification preferences' })
  @ApiResponse({ status: 200, type: PreferenceResponseDto })
  async getPreferences(@Param('userId') userId: string): Promise<PreferenceResponseDto> {
    return this.getUserPreferencesHandler.execute(new GetUserPreferencesQuery(userId));
  }

  @Patch('preferences/:userId')
  @ApiOperation({ summary: 'Update user notification preferences' })
  @ApiResponse({ status: 200, type: PreferenceResponseDto })
  async updatePreferences(@Param('userId') userId: string, @Body() dto: UpdatePreferenceDto): Promise<PreferenceResponseDto> {
    return this.updatePreferenceHandler.execute(new UpdatePreferenceCommand(userId, dto));
  }

  // --- DELIVERY LOGS ---

  @Get('logs')
  @ApiOperation({ summary: 'Get delivery logs' })
  @ApiResponse({ status: 200, type: [DeliveryLogResponseDto] })
  async getDeliveryLogs(@Query('notificationId') notificationId?: string): Promise<DeliveryLogResponseDto[]> {
    return this.getDeliveryLogsHandler.execute(new GetDeliveryLogsQuery(notificationId));
  }

  @Post('logs/:id/retry')
  @ApiOperation({ summary: 'Retry failed notification delivery' })
  async retryDelivery(@Param('id') deliveryLogId: string) {
    return this.retryDeliveryHandler.execute(new RetryDeliveryCommand(deliveryLogId));
  }
}

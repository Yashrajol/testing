import { Injectable, Inject } from '@nestjs/common';
import { NOTIFICATION_REPOSITORY_TOKEN } from '../../constants/notifications.constants';
import { INotificationRepository } from '../../repositories/notification.repository.interface';
import { CreateAnnouncementCommand } from '../commands/create-announcement.command';
import { AnnouncementResponseDto } from '../dtos/notification-response.dto';
import { NotificationMapper } from '../mappers/notification.mapper';

@Injectable()
export class CreateAnnouncementHandler {
  constructor(
    @Inject(NOTIFICATION_REPOSITORY_TOKEN)
    private readonly repo: INotificationRepository,
  ) {}

  async execute(command: CreateAnnouncementCommand): Promise<AnnouncementResponseDto> {
    const announcement = await this.repo.createAnnouncement({
      organizationId: command.dto.organizationId,
      schoolId: command.dto.schoolId,
      classId: command.dto.classId,
      batchId: command.dto.batchId,
      courseId: command.dto.courseId,
      targetRole: command.dto.targetRole,
      targetUserId: command.dto.targetUserId,
      title: command.dto.title,
      content: command.dto.content,
      authorId: command.authorId,
      expiresAt: command.dto.expiresAt ? new Date(command.dto.expiresAt) : undefined,
    });

    return NotificationMapper.toAnnouncementDto(announcement);
  }
}

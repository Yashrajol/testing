import { Injectable, Inject } from '@nestjs/common';
import { NOTIFICATION_REPOSITORY_TOKEN } from '../../constants/notifications.constants';
import { INotificationRepository } from '../../repositories/notification.repository.interface';
import { DeleteAnnouncementCommand } from '../commands/delete-announcement.command';

@Injectable()
export class DeleteAnnouncementHandler {
  constructor(
    @Inject(NOTIFICATION_REPOSITORY_TOKEN)
    private readonly repo: INotificationRepository,
  ) {}

  async execute(command: DeleteAnnouncementCommand): Promise<{ success: boolean; id: string }> {
    await this.repo.deleteAnnouncement(command.id);
    return { success: true, id: command.id };
  }
}

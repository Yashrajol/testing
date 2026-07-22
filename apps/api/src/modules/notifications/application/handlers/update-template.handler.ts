import { Injectable, Inject } from '@nestjs/common';
import { NOTIFICATION_REPOSITORY_TOKEN } from '../../constants/notifications.constants';
import { INotificationRepository } from '../../repositories/notification.repository.interface';
import { UpdateTemplateCommand } from '../commands/update-template.command';
import { TemplateResponseDto } from '../dtos/notification-response.dto';
import { NotificationMapper } from '../mappers/notification.mapper';

@Injectable()
export class UpdateTemplateHandler {
  constructor(
    @Inject(NOTIFICATION_REPOSITORY_TOKEN)
    private readonly repo: INotificationRepository,
  ) {}

  async execute(command: UpdateTemplateCommand): Promise<TemplateResponseDto> {
    const updated = await this.repo.updateTemplate(command.id, {
      name: command.dto.name,
      subject: command.dto.subject,
      htmlBody: command.dto.htmlBody,
      isActive: command.dto.isActive,
    });
    return NotificationMapper.toTemplateDto(updated);
  }
}

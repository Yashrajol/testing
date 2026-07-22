import { Injectable, Inject } from '@nestjs/common';
import { NOTIFICATION_REPOSITORY_TOKEN } from '../../constants/notifications.constants';
import { INotificationRepository } from '../../repositories/notification.repository.interface';
import { CreateTemplateCommand } from '../commands/create-template.command';
import { TemplateResponseDto } from '../dtos/notification-response.dto';
import { NotificationMapper } from '../mappers/notification.mapper';

@Injectable()
export class CreateTemplateHandler {
  constructor(
    @Inject(NOTIFICATION_REPOSITORY_TOKEN)
    private readonly repo: INotificationRepository,
  ) {}

  async execute(command: CreateTemplateCommand): Promise<TemplateResponseDto> {
    const template = await this.repo.createTemplate({
      code: command.dto.code,
      name: command.dto.name,
      type: command.dto.type,
      channel: command.dto.channel,
      subject: command.dto.subject,
      htmlBody: command.dto.htmlBody,
      textBody: command.dto.textBody,
      pushTitle: command.dto.pushTitle,
      whatsappBody: command.dto.whatsappBody,
      smsBody: command.dto.smsBody,
      variables: command.dto.variables,
      language: command.dto.language || 'en',
    });

    return NotificationMapper.toTemplateDto(template);
  }
}

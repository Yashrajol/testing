import { Injectable, Inject } from '@nestjs/common';
import { NOTIFICATION_REPOSITORY_TOKEN } from '../../constants/notifications.constants';
import { INotificationRepository } from '../../repositories/notification.repository.interface';
import { GetTemplateQuery } from '../queries/get-template.query';
import { TemplateResponseDto } from '../dtos/notification-response.dto';
import { NotificationMapper } from '../mappers/notification.mapper';
import { TemplateNotFoundException } from '../../domain/exceptions/notification-exceptions';

@Injectable()
export class GetTemplateHandler {
  constructor(
    @Inject(NOTIFICATION_REPOSITORY_TOKEN)
    private readonly repo: INotificationRepository,
  ) {}

  async execute(query: GetTemplateQuery): Promise<TemplateResponseDto> {
    const template = await this.repo.findTemplateByCode(query.codeOrId);
    if (!template) {
      throw new TemplateNotFoundException(query.codeOrId);
    }
    return NotificationMapper.toTemplateDto(template);
  }
}

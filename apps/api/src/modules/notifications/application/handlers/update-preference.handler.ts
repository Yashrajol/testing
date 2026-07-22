import { Injectable, Inject } from '@nestjs/common';
import { NOTIFICATION_REPOSITORY_TOKEN } from '../../constants/notifications.constants';
import { INotificationRepository } from '../../repositories/notification.repository.interface';
import { UpdatePreferenceCommand } from '../commands/update-preference.command';
import { PreferenceResponseDto } from '../dtos/notification-response.dto';
import { NotificationMapper } from '../mappers/notification.mapper';

@Injectable()
export class UpdatePreferenceHandler {
  constructor(
    @Inject(NOTIFICATION_REPOSITORY_TOKEN)
    private readonly repo: INotificationRepository,
  ) {}

  async execute(command: UpdatePreferenceCommand): Promise<PreferenceResponseDto> {
    const updated = await this.repo.upsertPreference(command.userId, {
      enabledChannels: command.dto.enabledChannels,
      categoryPreferences: command.dto.categoryPreferences,
      quietHoursStart: command.dto.quietHoursStart,
      quietHoursEnd: command.dto.quietHoursEnd,
      minPriority: command.dto.minPriority,
      preferredLanguage: command.dto.preferredLanguage,
      frequency: command.dto.frequency,
    });

    return NotificationMapper.toPreferenceDto(updated);
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { NOTIFICATION_REPOSITORY_TOKEN } from '../../constants/notifications.constants';
import { INotificationRepository } from '../../repositories/notification.repository.interface';
import { GetUserPreferencesQuery } from '../queries/get-user-preferences.query';
import { PreferenceResponseDto } from '../dtos/notification-response.dto';
import { NotificationMapper } from '../mappers/notification.mapper';

@Injectable()
export class GetUserPreferencesHandler {
  constructor(
    @Inject(NOTIFICATION_REPOSITORY_TOKEN)
    private readonly repo: INotificationRepository,
  ) {}

  async execute(query: GetUserPreferencesQuery): Promise<PreferenceResponseDto> {
    let pref = await this.repo.findPreferenceByUserId(query.userId);
    if (!pref) {
      pref = await this.repo.upsertPreference(query.userId, {});
    }
    return NotificationMapper.toPreferenceDto(pref);
  }
}

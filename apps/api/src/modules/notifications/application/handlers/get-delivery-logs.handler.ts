import { Injectable, Inject } from '@nestjs/common';
import { NOTIFICATION_REPOSITORY_TOKEN } from '../../constants/notifications.constants';
import { INotificationRepository } from '../../repositories/notification.repository.interface';
import { GetDeliveryLogsQuery } from '../queries/get-delivery-logs.query';
import { DeliveryLogResponseDto } from '../dtos/notification-response.dto';
import { NotificationMapper } from '../mappers/notification.mapper';

@Injectable()
export class GetDeliveryLogsHandler {
  constructor(
    @Inject(NOTIFICATION_REPOSITORY_TOKEN)
    private readonly repo: INotificationRepository,
  ) {}

  async execute(query: GetDeliveryLogsQuery): Promise<DeliveryLogResponseDto[]> {
    const logs = await this.repo.findDeliveryLogs(query.notificationId);
    return logs.map((l) => NotificationMapper.toDeliveryLogDto(l));
  }
}

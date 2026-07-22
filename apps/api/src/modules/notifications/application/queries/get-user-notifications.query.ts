import { NotificationFilterOptions } from '../../types/notifications.types';

export class GetUserNotificationsQuery {
  constructor(public readonly recipientId: string, public readonly options?: NotificationFilterOptions) {}
}

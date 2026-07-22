import { AnnouncementFilterOptions } from '../../types/notifications.types';

export class GetAnnouncementsQuery {
  constructor(public readonly options?: AnnouncementFilterOptions) {}
}

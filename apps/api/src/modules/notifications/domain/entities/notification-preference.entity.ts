import { NotificationPriority } from '../../constants/notifications.constants';

export interface NotificationPreferenceProps {
  id: string;
  userId: string;
  enabledChannels?: any;
  categoryPreferences?: any;
  quietHoursStart?: string | null;
  quietHoursEnd?: string | null;
  minPriority: NotificationPriority;
  preferredLanguage: string;
  frequency: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class NotificationPreferenceEntity {
  constructor(private readonly props: NotificationPreferenceProps) {}

  get id(): string { return this.props.id; }
  get userId(): string { return this.props.userId; }
  get enabledChannels(): any { return this.props.enabledChannels; }
  get categoryPreferences(): any { return this.props.categoryPreferences; }
  get quietHoursStart(): string | null | undefined { return this.props.quietHoursStart; }
  get quietHoursEnd(): string | null | undefined { return this.props.quietHoursEnd; }
  get minPriority(): NotificationPriority { return this.props.minPriority; }
  get preferredLanguage(): string { return this.props.preferredLanguage; }
  get frequency(): string { return this.props.frequency; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }
}

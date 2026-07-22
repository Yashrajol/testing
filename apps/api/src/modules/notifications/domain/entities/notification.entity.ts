import { NotificationChannel, NotificationType, NotificationPriority, DeliveryStatus, TargetAudienceRole } from '../../constants/notifications.constants';

export interface NotificationProps {
  id: string;
  organizationId?: string | null;
  tenantId?: string | null;
  recipientId: string;
  recipientRole: TargetAudienceRole;
  type: NotificationType;
  title: string;
  body: string;
  actionUrl?: string | null;
  channel: NotificationChannel;
  priority: NotificationPriority;
  status: DeliveryStatus;
  isRead: boolean;
  readAt?: Date | null;
  scheduledFor?: Date | null;
  metadata?: any;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class NotificationEntity {
  constructor(private readonly props: NotificationProps) {}

  get id(): string { return this.props.id; }
  get organizationId(): string | null | undefined { return this.props.organizationId; }
  get tenantId(): string | null | undefined { return this.props.tenantId; }
  get recipientId(): string { return this.props.recipientId; }
  get recipientRole(): TargetAudienceRole { return this.props.recipientRole; }
  get type(): NotificationType { return this.props.type; }
  get title(): string { return this.props.title; }
  get body(): string { return this.props.body; }
  get actionUrl(): string | null | undefined { return this.props.actionUrl; }
  get channel(): NotificationChannel { return this.props.channel; }
  get priority(): NotificationPriority { return this.props.priority; }
  get status(): DeliveryStatus { return this.props.status; }
  get isRead(): boolean { return this.props.isRead; }
  get readAt(): Date | null | undefined { return this.props.readAt; }
  get scheduledFor(): Date | null | undefined { return this.props.scheduledFor; }
  get metadata(): any { return this.props.metadata; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }
}

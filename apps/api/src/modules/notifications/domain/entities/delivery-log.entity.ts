import { NotificationChannel, DeliveryStatus } from '../../constants/notifications.constants';

export interface DeliveryLogProps {
  id: string;
  notificationId: string;
  channel: NotificationChannel;
  status: DeliveryStatus;
  provider?: string | null;
  providerMsgId?: string | null;
  errorMessage?: string | null;
  attemptCount: number;
  nextAttemptAt?: Date | null;
  sentAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export class DeliveryLogEntity {
  constructor(private readonly props: DeliveryLogProps) {}

  get id(): string { return this.props.id; }
  get notificationId(): string { return this.props.notificationId; }
  get channel(): NotificationChannel { return this.props.channel; }
  get status(): DeliveryStatus { return this.props.status; }
  get provider(): string | null | undefined { return this.props.provider; }
  get providerMsgId(): string | null | undefined { return this.props.providerMsgId; }
  get errorMessage(): string | null | undefined { return this.props.errorMessage; }
  get attemptCount(): number { return this.props.attemptCount; }
  get nextAttemptAt(): Date | null | undefined { return this.props.nextAttemptAt; }
  get sentAt(): Date | null | undefined { return this.props.sentAt; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
}

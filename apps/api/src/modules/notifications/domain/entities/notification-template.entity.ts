import { NotificationChannel, NotificationType } from '../../constants/notifications.constants';

export interface NotificationTemplateProps {
  id: string;
  code: string;
  name: string;
  type: NotificationType;
  channel: NotificationChannel;
  subject?: string | null;
  htmlBody?: string | null;
  textBody?: string | null;
  pushTitle?: string | null;
  whatsappBody?: string | null;
  smsBody?: string | null;
  variables?: any;
  language: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class NotificationTemplateEntity {
  constructor(private readonly props: NotificationTemplateProps) {}

  get id(): string { return this.props.id; }
  get code(): string { return this.props.code; }
  get name(): string { return this.props.name; }
  get type(): NotificationType { return this.props.type; }
  get channel(): NotificationChannel { return this.props.channel; }
  get subject(): string | null | undefined { return this.props.subject; }
  get htmlBody(): string | null | undefined { return this.props.htmlBody; }
  get textBody(): string | null | undefined { return this.props.textBody; }
  get pushTitle(): string | null | undefined { return this.props.pushTitle; }
  get whatsappBody(): string | null | undefined { return this.props.whatsappBody; }
  get smsBody(): string | null | undefined { return this.props.smsBody; }
  get variables(): any { return this.props.variables; }
  get language(): string { return this.props.language; }
  get isActive(): boolean { return this.props.isActive; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }
}

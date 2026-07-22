export interface WebhookProps {
  id: string;
  organizationId?: string | null;
  tenantId?: string | null;
  url: string;
  events: string[];
  secret: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class WebhookEntity {
  constructor(private readonly props: WebhookProps) {}

  get id(): string { return this.props.id; }
  get organizationId(): string | null | undefined { return this.props.organizationId; }
  get tenantId(): string | null | undefined { return this.props.tenantId; }
  get url(): string { return this.props.url; }
  get events(): string[] { return this.props.events; }
  get secret(): string { return this.props.secret; }
  get isActive(): boolean { return this.props.isActive; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }
}

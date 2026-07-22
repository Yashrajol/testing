export interface IntegrationProps {
  id: string;
  organizationId?: string | null;
  tenantId?: string | null;
  connectorId: string;
  config: any;
  status: string;
  lastSyncedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class IntegrationEntity {
  constructor(private readonly props: IntegrationProps) {}

  get id(): string { return this.props.id; }
  get organizationId(): string | null | undefined { return this.props.organizationId; }
  get tenantId(): string | null | undefined { return this.props.tenantId; }
  get connectorId(): string { return this.props.connectorId; }
  get config(): any { return this.props.config; }
  get status(): string { return this.props.status; }
  get lastSyncedAt(): Date | null | undefined { return this.props.lastSyncedAt; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }
}

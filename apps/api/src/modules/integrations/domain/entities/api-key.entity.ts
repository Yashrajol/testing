export interface ApiKeyProps {
  id: string;
  organizationId?: string | null;
  tenantId?: string | null;
  name: string;
  keyHash: string;
  scopes: string[];
  expiresAt?: Date | null;
  isActive: boolean;
  lastUsedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class ApiKeyEntity {
  constructor(private readonly props: ApiKeyProps) {}

  get id(): string { return this.props.id; }
  get organizationId(): string | null | undefined { return this.props.organizationId; }
  get tenantId(): string | null | undefined { return this.props.tenantId; }
  get name(): string { return this.props.name; }
  get keyHash(): string { return this.props.keyHash; }
  get scopes(): string[] { return this.props.scopes; }
  get expiresAt(): Date | null | undefined { return this.props.expiresAt; }
  get isActive(): boolean { return this.props.isActive; }
  get lastUsedAt(): Date | null | undefined { return this.props.lastUsedAt; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }
}

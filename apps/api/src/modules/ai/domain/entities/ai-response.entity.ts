export interface AIResponseProps {
  id: string;
  requestId: string;
  organizationId?: string | null;
  tenantId?: string | null;
  content: string;
  outputTokens: number;
  latencyMs: number;
  cost: number;
  cachedHit: boolean;
  createdAt: Date;
}

export class AIResponseEntity {
  constructor(private readonly props: AIResponseProps) {}

  get id(): string { return this.props.id; }
  get requestId(): string { return this.props.requestId; }
  get organizationId(): string | null | undefined { return this.props.organizationId; }
  get tenantId(): string | null | undefined { return this.props.tenantId; }
  get content(): string { return this.props.content; }
  get outputTokens(): number { return this.props.outputTokens; }
  get latencyMs(): number { return this.props.latencyMs; }
  get cost(): number { return this.props.cost; }
  get cachedHit(): boolean { return this.props.cachedHit; }
  get createdAt(): Date { return this.props.createdAt; }
}

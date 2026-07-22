export interface AIRequestProps {
  id: string;
  organizationId?: string | null;
  tenantId?: string | null;
  provider: string;
  model: string;
  promptType: string;
  inputTokens: number;
  estimatedCost: number;
  userId?: string | null;
  createdAt: Date;
}

export class AIRequestEntity {
  constructor(private readonly props: AIRequestProps) {}

  get id(): string { return this.props.id; }
  get organizationId(): string | null | undefined { return this.props.organizationId; }
  get tenantId(): string | null | undefined { return this.props.tenantId; }
  get provider(): string { return this.props.provider; }
  get model(): string { return this.props.model; }
  get promptType(): string { return this.props.promptType; }
  get inputTokens(): number { return this.props.inputTokens; }
  get estimatedCost(): number { return this.props.estimatedCost; }
  get userId(): string | null | undefined { return this.props.userId; }
  get createdAt(): Date { return this.props.createdAt; }
}

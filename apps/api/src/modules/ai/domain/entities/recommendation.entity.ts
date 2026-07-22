export interface RecommendationProps {
  id: string;
  organizationId?: string | null;
  tenantId?: string | null;
  targetId: string;
  targetType: string;
  title: string;
  content: string;
  contextData?: any;
  isApplied: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class RecommendationEntity {
  constructor(private readonly props: RecommendationProps) {}

  get id(): string { return this.props.id; }
  get organizationId(): string | null | undefined { return this.props.organizationId; }
  get tenantId(): string | null | undefined { return this.props.tenantId; }
  get targetId(): string { return this.props.targetId; }
  get targetType(): string { return this.props.targetType; }
  get title(): string { return this.props.title; }
  get content(): string { return this.props.content; }
  get contextData(): any { return this.props.contextData; }
  get isApplied(): boolean { return this.props.isApplied; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }
}

export interface LearningInsightProps {
  id: string;
  organizationId?: string | null;
  tenantId?: string | null;
  studentId: string;
  focusScore: number;
  retentionRate: number;
  velocityIndex: number;
  insights: any;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class LearningInsightEntity {
  constructor(private readonly props: LearningInsightProps) {}

  get id(): string { return this.props.id; }
  get organizationId(): string | null | undefined { return this.props.organizationId; }
  get tenantId(): string | null | undefined { return this.props.tenantId; }
  get studentId(): string { return this.props.studentId; }
  get focusScore(): number { return this.props.focusScore; }
  get retentionRate(): number { return this.props.retentionRate; }
  get velocityIndex(): number { return this.props.velocityIndex; }
  get insights(): any { return this.props.insights; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }
}

export interface CareerAdviceProps {
  id: string;
  organizationId?: string | null;
  tenantId?: string | null;
  studentId: string;
  industry: string;
  recommendedRoles: string[];
  skillGaps: string[];
  adviceText: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class CareerAdviceEntity {
  constructor(private readonly props: CareerAdviceProps) {}

  get id(): string { return this.props.id; }
  get organizationId(): string | null | undefined { return this.props.organizationId; }
  get tenantId(): string | null | undefined { return this.props.tenantId; }
  get studentId(): string { return this.props.studentId; }
  get industry(): string { return this.props.industry; }
  get recommendedRoles(): string[] { return this.props.recommendedRoles; }
  get skillGaps(): string[] { return this.props.skillGaps; }
  get adviceText(): string { return this.props.adviceText; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }
}

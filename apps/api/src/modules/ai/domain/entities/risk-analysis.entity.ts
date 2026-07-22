export interface RiskAnalysisProps {
  id: string;
  organizationId?: string | null;
  tenantId?: string | null;
  studentId: string;
  riskLevel: string;
  summary: string;
  riskFactors: string[];
  interventions: string[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class RiskAnalysisEntity {
  constructor(private readonly props: RiskAnalysisProps) {}

  get id(): string { return this.props.id; }
  get organizationId(): string | null | undefined { return this.props.organizationId; }
  get tenantId(): string | null | undefined { return this.props.tenantId; }
  get studentId(): string { return this.props.studentId; }
  get riskLevel(): string { return this.props.riskLevel; }
  get summary(): string { return this.props.summary; }
  get riskFactors(): string[] { return this.props.riskFactors; }
  get interventions(): string[] { return this.props.interventions; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }
}

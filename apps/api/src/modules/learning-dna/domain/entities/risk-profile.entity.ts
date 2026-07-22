export interface RiskProfileProps {
  id: string;
  learningDnaId: string;
  riskScore: number;
  riskLevel: string;
  reasons: string[];
  createdAt: Date;
  updatedAt: Date;
}

export class RiskProfileEntity {
  constructor(private readonly props: RiskProfileProps) {}

  get id(): string { return this.props.id; }
  get learningDnaId(): string { return this.props.learningDnaId; }
  get riskScore(): number { return this.props.riskScore; }
  get riskLevel(): string { return this.props.riskLevel; }
  get reasons(): string[] { return this.props.reasons; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
}

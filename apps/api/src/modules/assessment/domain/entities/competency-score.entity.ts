export interface CompetencyScoreProps {
  id: string;
  attemptId: string;
  competencyName: string;
  score: number;
  maxScore: number;
  percentage: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class CompetencyScoreEntity {
  constructor(private readonly props: CompetencyScoreProps) {}

  get id(): string { return this.props.id; }
  get attemptId(): string { return this.props.attemptId; }
  get competencyName(): string { return this.props.competencyName; }
  get score(): number { return this.props.score; }
  get maxScore(): number { return this.props.maxScore; }
  get percentage(): number { return this.props.percentage; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }
}

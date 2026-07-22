export interface CompetencyProfileProps {
  id: string;
  learningDnaId: string;
  competencyName: string;
  level: string;
  score: number;
  gapAnalysis?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class CompetencyProfileEntity {
  constructor(private readonly props: CompetencyProfileProps) {}

  get id(): string { return this.props.id; }
  get learningDnaId(): string { return this.props.learningDnaId; }
  get competencyName(): string { return this.props.competencyName; }
  get level(): string { return this.props.level; }
  get score(): number { return this.props.score; }
  get gapAnalysis(): string | null | undefined { return this.props.gapAnalysis; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
}

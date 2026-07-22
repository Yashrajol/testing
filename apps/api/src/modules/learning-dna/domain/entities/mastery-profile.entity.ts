export interface MasteryProfileProps {
  id: string;
  learningDnaId: string;
  subjectId: string;
  masteryScore: number;
  retentionScore: number;
  velocityScore: number;
  createdAt: Date;
  updatedAt: Date;
}

export class MasteryProfileEntity {
  constructor(private readonly props: MasteryProfileProps) {}

  get id(): string { return this.props.id; }
  get learningDnaId(): string { return this.props.learningDnaId; }
  get subjectId(): string { return this.props.subjectId; }
  get masteryScore(): number { return this.props.masteryScore; }
  get retentionScore(): number { return this.props.retentionScore; }
  get velocityScore(): number { return this.props.velocityScore; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
}

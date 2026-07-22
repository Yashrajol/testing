export interface LearningPatternProps {
  id: string;
  learningDnaId: string;
  preferredTimeOfDay: string;
  preferredContentType: string;
  consistencyScore: number;
  engagementScore: number;
  createdAt: Date;
  updatedAt: Date;
}

export class LearningPatternEntity {
  constructor(private readonly props: LearningPatternProps) {}

  get id(): string { return this.props.id; }
  get learningDnaId(): string { return this.props.learningDnaId; }
  get preferredTimeOfDay(): string { return this.props.preferredTimeOfDay; }
  get preferredContentType(): string { return this.props.preferredContentType; }
  get consistencyScore(): number { return this.props.consistencyScore; }
  get engagementScore(): number { return this.props.engagementScore; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
}

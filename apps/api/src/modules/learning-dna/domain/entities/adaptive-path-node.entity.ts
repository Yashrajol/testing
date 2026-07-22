export interface AdaptivePathNodeProps {
  id: string;
  studentId: string;
  topicId: string;
  recommendedAction: string;
  priority: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export class AdaptivePathNodeEntity {
  constructor(private readonly props: AdaptivePathNodeProps) {}

  get id(): string { return this.props.id; }
  get studentId(): string { return this.props.studentId; }
  get topicId(): string { return this.props.topicId; }
  get recommendedAction(): string { return this.props.recommendedAction; }
  get priority(): number { return this.props.priority; }
  get status(): string { return this.props.status; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
}

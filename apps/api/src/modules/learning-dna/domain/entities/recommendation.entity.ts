export interface RecommendationProps {
  id: string;
  learningDnaId: string;
  title: string;
  description: string;
  actionType: string;
  priority: string;
  createdAt: Date;
  updatedAt: Date;
}

export class RecommendationEntity {
  constructor(private readonly props: RecommendationProps) {}

  get id(): string { return this.props.id; }
  get learningDnaId(): string { return this.props.learningDnaId; }
  get title(): string { return this.props.title; }
  get description(): string { return this.props.description; }
  get actionType(): string { return this.props.actionType; }
  get priority(): string { return this.props.priority; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
}

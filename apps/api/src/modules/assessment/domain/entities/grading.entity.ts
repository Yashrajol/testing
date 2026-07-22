export interface GradingProps {
  id: string;
  attemptId: string;
  evaluatorId?: string | null;
  evaluatorType: string;
  scoreGranted: number;
  comments?: string | null;
  evaluatedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class GradingEntity {
  constructor(private readonly props: GradingProps) {}

  get id(): string { return this.props.id; }
  get attemptId(): string { return this.props.attemptId; }
  get evaluatorId(): string | null | undefined { return this.props.evaluatorId; }
  get evaluatorType(): string { return this.props.evaluatorType; }
  get scoreGranted(): number { return this.props.scoreGranted; }
  get comments(): string | null | undefined { return this.props.comments; }
  get evaluatedAt(): Date { return this.props.evaluatedAt; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }
}

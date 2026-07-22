export interface FeedbackProps {
  id: string;
  submissionId: string;
  authorId: string;
  comment: string;
  scoreGiven?: number | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class FeedbackEntity {
  constructor(private readonly props: FeedbackProps) {}

  get id(): string { return this.props.id; }
  get submissionId(): string { return this.props.submissionId; }
  get authorId(): string { return this.props.authorId; }
  get comment(): string { return this.props.comment; }
  get scoreGiven(): number | null | undefined { return this.props.scoreGiven; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }
}

export interface FeedbackProps {
  id: string;
  submissionId: string;
  authorId: string;
  authorType: 'TEACHER' | 'PEER' | 'AI' | string;
  comment: string;
  criteriaScores?: any;
  audioFeedbackUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class FeedbackEntity {
  constructor(private readonly props: FeedbackProps) {}

  get id(): string { return this.props.id; }
  get submissionId(): string { return this.props.submissionId; }
  get authorId(): string { return this.props.authorId; }
  get authorType(): string { return this.props.authorType; }
  get comment(): string { return this.props.comment; }
  get criteriaScores(): any { return this.props.criteriaScores; }
  get audioFeedbackUrl(): string | null | undefined { return this.props.audioFeedbackUrl; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }
}

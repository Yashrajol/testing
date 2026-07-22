export interface TopicProps {
  id: string;
  chapterId: string;
  title: string;
  sequence: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class TopicEntity {
  constructor(private readonly props: TopicProps) {}

  get id(): string { return this.props.id; }
  get chapterId(): string { return this.props.chapterId; }
  get title(): string { return this.props.title; }
  get sequence(): number { return this.props.sequence; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }
}

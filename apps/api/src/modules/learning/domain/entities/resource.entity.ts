export interface LearningResourceProps {
  id: string;
  lessonId: string;
  title: string;
  type: string;
  url: string;
  metadata?: Record<string, any> | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class LearningResourceEntity {
  constructor(private readonly props: LearningResourceProps) {}

  get id(): string { return this.props.id; }
  get lessonId(): string { return this.props.lessonId; }
  get title(): string { return this.props.title; }
  get type(): string { return this.props.type; }
  get url(): string { return this.props.url; }
  get metadata(): Record<string, any> | null | undefined { return this.props.metadata; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }
}

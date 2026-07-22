export interface LessonProps {
  id: string;
  chapterId?: string | null;
  topicId?: string | null;
  title: string;
  content?: string | null;
  sequence: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class LessonEntity {
  constructor(private readonly props: LessonProps) {}

  get id(): string { return this.props.id; }
  get chapterId(): string | null | undefined { return this.props.chapterId; }
  get topicId(): string | null | undefined { return this.props.topicId; }
  get title(): string { return this.props.title; }
  get content(): string | null | undefined { return this.props.content; }
  get sequence(): number { return this.props.sequence; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }
}

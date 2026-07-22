export interface QuestionBankProps {
  id: string;
  title: string;
  description?: string | null;
  category?: string | null;
  subjectId?: string | null;
  chapterId?: string | null;
  topicId?: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class QuestionBankEntity {
  constructor(private readonly props: QuestionBankProps) {}

  get id(): string { return this.props.id; }
  get title(): string { return this.props.title; }
  get description(): string | null | undefined { return this.props.description; }
  get category(): string | null | undefined { return this.props.category; }
  get subjectId(): string | null | undefined { return this.props.subjectId; }
  get chapterId(): string | null | undefined { return this.props.chapterId; }
  get topicId(): string | null | undefined { return this.props.topicId; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }
}

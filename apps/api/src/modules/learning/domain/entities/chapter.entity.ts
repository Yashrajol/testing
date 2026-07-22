export interface ChapterProps {
  id: string;
  subjectId?: string | null;
  curriculumId?: string | null;
  title: string;
  sequence: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class ChapterEntity {
  constructor(private readonly props: ChapterProps) {}

  get id(): string { return this.props.id; }
  get subjectId(): string | null | undefined { return this.props.subjectId; }
  get curriculumId(): string | null | undefined { return this.props.curriculumId; }
  get title(): string { return this.props.title; }
  get sequence(): number { return this.props.sequence; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }
}

export interface CurriculumProps {
  id: string;
  courseId: string;
  title: string;
  version: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class CurriculumEntity {
  constructor(private readonly props: CurriculumProps) {}

  get id(): string { return this.props.id; }
  get courseId(): string { return this.props.courseId; }
  get title(): string { return this.props.title; }
  get version(): number { return this.props.version; }
  get status(): string { return this.props.status; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }
}

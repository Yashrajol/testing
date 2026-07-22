export interface CourseProps {
  id: string;
  subjectId: string;
  title: string;
  code: string;
  description?: string | null;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class CourseEntity {
  constructor(private readonly props: CourseProps) {}

  get id(): string { return this.props.id; }
  get subjectId(): string { return this.props.subjectId; }
  get title(): string { return this.props.title; }
  get code(): string { return this.props.code; }
  get description(): string | null | undefined { return this.props.description; }
  get version(): number { return this.props.version; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }
}

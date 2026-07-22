export interface SubjectProps {
  id: string;
  code: string;
  name: string;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class SubjectEntity {
  constructor(private readonly props: SubjectProps) {}

  get id(): string { return this.props.id; }
  get code(): string { return this.props.code; }
  get name(): string { return this.props.name; }
  get description(): string | null | undefined { return this.props.description; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }
}

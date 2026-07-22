export interface ClassProps {
  id: string;
  name: string;
  code?: string | null;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class ClassEntity {
  constructor(private readonly props: ClassProps) {}

  get id(): string { return this.props.id; }
  get name(): string { return this.props.name; }
  get code(): string | null | undefined { return this.props.code; }
  get description(): string | null | undefined { return this.props.description; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }
}

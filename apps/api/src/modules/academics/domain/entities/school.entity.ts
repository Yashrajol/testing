export interface SchoolProps {
  id: string;
  organizationId: string;
  name: string;
  board: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class SchoolEntity {
  constructor(private readonly props: SchoolProps) {}

  get id(): string { return this.props.id; }
  get organizationId(): string { return this.props.organizationId; }
  get name(): string { return this.props.name; }
  get board(): string { return this.props.board; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }
}

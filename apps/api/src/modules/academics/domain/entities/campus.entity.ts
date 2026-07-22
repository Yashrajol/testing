export interface CampusProps {
  id: string;
  schoolId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class CampusEntity {
  constructor(private readonly props: CampusProps) {}

  get id(): string { return this.props.id; }
  get schoolId(): string { return this.props.schoolId; }
  get name(): string { return this.props.name; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }
}

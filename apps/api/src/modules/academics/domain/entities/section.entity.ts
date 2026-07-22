export interface SectionProps {
  id: string;
  classId: string;
  name: string;
  capacity?: number | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class SectionEntity {
  constructor(private readonly props: SectionProps) {}

  get id(): string { return this.props.id; }
  get classId(): string { return this.props.classId; }
  get name(): string { return this.props.name; }
  get capacity(): number | null | undefined { return this.props.capacity; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }
}

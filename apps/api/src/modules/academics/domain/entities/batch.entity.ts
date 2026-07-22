export interface BatchProps {
  id: string;
  campusId: string;
  academicYearId: string;
  sectionId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class BatchEntity {
  constructor(private readonly props: BatchProps) {}

  get id(): string { return this.props.id; }
  get campusId(): string { return this.props.campusId; }
  get academicYearId(): string { return this.props.academicYearId; }
  get sectionId(): string { return this.props.sectionId; }
  get name(): string { return this.props.name; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }
}

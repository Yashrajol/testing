export interface AcademicTermProps {
  id: string;
  academicYearId: string;
  name: string;
  startDate: Date;
  endDate: Date;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class AcademicTermEntity {
  constructor(private readonly props: AcademicTermProps) {}

  get id(): string { return this.props.id; }
  get academicYearId(): string { return this.props.academicYearId; }
  get name(): string { return this.props.name; }
  get startDate(): Date { return this.props.startDate; }
  get endDate(): Date { return this.props.endDate; }
  get status(): string { return this.props.status; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }
}

export interface AcademicYearProps {
  id: string;
  schoolId: string;
  startDate: Date;
  endDate: Date;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class AcademicYearEntity {
  constructor(private readonly props: AcademicYearProps) {}

  get id(): string { return this.props.id; }
  get schoolId(): string { return this.props.schoolId; }
  get startDate(): Date { return this.props.startDate; }
  get endDate(): Date { return this.props.endDate; }
  get status(): string { return this.props.status; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }
}

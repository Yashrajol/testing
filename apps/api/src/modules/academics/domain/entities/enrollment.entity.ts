export interface EnrollmentProps {
  id: string;
  studentId: string;
  classId: string;
  sectionId: string;
  batchId: string;
  academicYearId: string;
  rollNumber?: string | null;
  admissionDate: Date;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class EnrollmentEntity {
  constructor(private readonly props: EnrollmentProps) {}

  get id(): string { return this.props.id; }
  get studentId(): string { return this.props.studentId; }
  get classId(): string { return this.props.classId; }
  get sectionId(): string { return this.props.sectionId; }
  get batchId(): string { return this.props.batchId; }
  get academicYearId(): string { return this.props.academicYearId; }
  get rollNumber(): string | null | undefined { return this.props.rollNumber; }
  get admissionDate(): Date { return this.props.admissionDate; }
  get status(): string { return this.props.status; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }
}

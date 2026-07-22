export interface DeadlineExtensionProps {
  id: string;
  assignmentId: string;
  studentId: string;
  extendedDueDate: Date;
  reason?: string | null;
  grantedBy: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class DeadlineExtensionEntity {
  constructor(private readonly props: DeadlineExtensionProps) {}

  get id(): string { return this.props.id; }
  get assignmentId(): string { return this.props.assignmentId; }
  get studentId(): string { return this.props.studentId; }
  get extendedDueDate(): Date { return this.props.extendedDueDate; }
  get reason(): string | null | undefined { return this.props.reason; }
  get grantedBy(): string { return this.props.grantedBy; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }
}

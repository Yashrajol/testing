export interface AssignmentProps {
  id: string;
  batchId?: string | null;
  title: string;
  description?: string | null;
  totalPoints: number;
  dueDate: Date;
  allowLate?: boolean;
  allowResubmit?: boolean;
  maxSubmissions?: number;
  status: string;
  publishedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class AssignmentEntity {
  constructor(private readonly props: AssignmentProps) {}

  get id(): string { return this.props.id; }
  get batchId(): string | null | undefined { return this.props.batchId; }
  get title(): string { return this.props.title; }
  get description(): string | null | undefined { return this.props.description; }
  get totalPoints(): number { return this.props.totalPoints; }
  get dueDate(): Date { return this.props.dueDate; }
  get allowLate(): boolean { return this.props.allowLate !== false; }
  get allowResubmit(): boolean { return this.props.allowResubmit !== false; }
  get maxSubmissions(): number { return this.props.maxSubmissions || 3; }
  get status(): string { return this.props.status; }
  get publishedAt(): Date | null | undefined { return this.props.publishedAt; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }
}

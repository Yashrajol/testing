export interface AssignmentSubmissionProps {
  id: string;
  assignmentId: string;
  studentId: string;
  attemptNumber: number;
  content?: string | null;
  submittedAt: Date;
  isLate: boolean;
  status: string;
  score?: number | null;
  evaluatedAt?: Date | null;
  evaluatorId?: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class AssignmentSubmissionEntity {
  constructor(private readonly props: AssignmentSubmissionProps) {}

  get id(): string { return this.props.id; }
  get assignmentId(): string { return this.props.assignmentId; }
  get studentId(): string { return this.props.studentId; }
  get attemptNumber(): number { return this.props.attemptNumber; }
  get content(): string | null | undefined { return this.props.content; }
  get submittedAt(): Date { return this.props.submittedAt; }
  get isLate(): boolean { return this.props.isLate; }
  get status(): string { return this.props.status; }
  get score(): number | null | undefined { return this.props.score; }
  get evaluatedAt(): Date | null | undefined { return this.props.evaluatedAt; }
  get evaluatorId(): string | null | undefined { return this.props.evaluatorId; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }
}

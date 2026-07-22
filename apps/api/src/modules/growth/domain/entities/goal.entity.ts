export interface GoalProps {
  id: string;
  studentId: string;
  title: string;
  description?: string | null;
  targetDate?: Date | null;
  progress: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export class GoalEntity {
  constructor(private readonly props: GoalProps) {}

  get id(): string { return this.props.id; }
  get studentId(): string { return this.props.studentId; }
  get title(): string { return this.props.title; }
  get description(): string | null | undefined { return this.props.description; }
  get targetDate(): Date | null | undefined { return this.props.targetDate; }
  get progress(): number { return this.props.progress; }
  get status(): string { return this.props.status; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
}

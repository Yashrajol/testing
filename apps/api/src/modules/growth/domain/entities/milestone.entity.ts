export interface MilestoneProps {
  id: string;
  studentId: string;
  title: string;
  targetDate: Date;
  achievedAt?: Date | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export class MilestoneEntity {
  constructor(private readonly props: MilestoneProps) {}

  get id(): string { return this.props.id; }
  get studentId(): string { return this.props.studentId; }
  get title(): string { return this.props.title; }
  get targetDate(): Date { return this.props.targetDate; }
  get achievedAt(): Date | null | undefined { return this.props.achievedAt; }
  get status(): string { return this.props.status; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
}

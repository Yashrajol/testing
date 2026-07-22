export interface AssessmentProps {
  id: string;
  title: string;
  description?: string | null;
  type: string;
  timeLimitMins?: number | null;
  totalMarks: number;
  passPercentage: number;
  startDate?: Date | null;
  endDate?: Date | null;
  instructions?: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class AssessmentEntity {
  constructor(private readonly props: AssessmentProps) {}

  get id(): string { return this.props.id; }
  get title(): string { return this.props.title; }
  get description(): string | null | undefined { return this.props.description; }
  get type(): string { return this.props.type; }
  get timeLimitMins(): number | null | undefined { return this.props.timeLimitMins; }
  get totalMarks(): number { return this.props.totalMarks; }
  get passPercentage(): number { return this.props.passPercentage; }
  get startDate(): Date | null | undefined { return this.props.startDate; }
  get endDate(): Date | null | undefined { return this.props.endDate; }
  get instructions(): string | null | undefined { return this.props.instructions; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }
}

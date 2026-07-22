export interface AssessmentAttemptProps {
  id: string;
  assessmentId: string;
  studentId: string;
  startTime: Date;
  endTime?: Date | null;
  durationSeconds?: number | null;
  totalScore?: number | null;
  percentage?: number | null;
  status: string;
  competencyBreakdown?: any;
  questionAnalytics?: any;
  learningOutcome?: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class AssessmentAttemptEntity {
  constructor(private readonly props: AssessmentAttemptProps) {}

  get id(): string { return this.props.id; }
  get assessmentId(): string { return this.props.assessmentId; }
  get studentId(): string { return this.props.studentId; }
  get startTime(): Date { return this.props.startTime; }
  get endTime(): Date | null | undefined { return this.props.endTime; }
  get durationSeconds(): number | null | undefined { return this.props.durationSeconds; }
  get totalScore(): number | null | undefined { return this.props.totalScore; }
  get percentage(): number | null | undefined { return this.props.percentage; }
  get status(): string { return this.props.status; }
  get competencyBreakdown(): any { return this.props.competencyBreakdown; }
  get questionAnalytics(): any { return this.props.questionAnalytics; }
  get learningOutcome(): string | null | undefined { return this.props.learningOutcome; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }
}

export interface AssignmentAnalyticsProps {
  id: string;
  organizationId?: string | null;
  tenantId?: string | null;
  assignmentId?: string | null;
  batchId?: string | null;
  classId?: string | null;
  studentId?: string | null;
  totalAssigned: number;
  totalSubmitted: number;
  totalGraded: number;
  submissionRate: number;
  completionRate: number;
  lateSubmissionRate: number;
  averageScore: number;
  rubricAnalytics?: any;
  topicWeaknesses?: any;
  lastCalculatedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class AssignmentAnalyticsEntity {
  constructor(private readonly props: AssignmentAnalyticsProps) {}

  get id(): string { return this.props.id; }
  get organizationId(): string | null | undefined { return this.props.organizationId; }
  get tenantId(): string | null | undefined { return this.props.tenantId; }
  get assignmentId(): string | null | undefined { return this.props.assignmentId; }
  get batchId(): string | null | undefined { return this.props.batchId; }
  get classId(): string | null | undefined { return this.props.classId; }
  get studentId(): string | null | undefined { return this.props.studentId; }
  get totalAssigned(): number { return this.props.totalAssigned; }
  get totalSubmitted(): number { return this.props.totalSubmitted; }
  get totalGraded(): number { return this.props.totalGraded; }
  get submissionRate(): number { return this.props.submissionRate; }
  get completionRate(): number { return this.props.completionRate; }
  get lateSubmissionRate(): number { return this.props.lateSubmissionRate; }
  get averageScore(): number { return this.props.averageScore; }
  get rubricAnalytics(): any { return this.props.rubricAnalytics; }
  get topicWeaknesses(): any { return this.props.topicWeaknesses; }
  get lastCalculatedAt(): Date { return this.props.lastCalculatedAt; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }
}

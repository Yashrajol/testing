export interface AnalyticsSnapshotProps {
  id: string;
  organizationId?: string | null;
  tenantId?: string | null;
  schoolId?: string | null;
  studentId?: string | null;
  teacherId?: string | null;
  entityType: string;
  overallMasteryScore: number;
  attendancePercentage: number;
  assignmentCompletion: number;
  learningVelocity: number;
  retentionScore: number;
  studyTimeMins: number;
  riskLevel: string;
  weakTopics: string[];
  strongTopics: string[];
  kpiMetrics?: any;
  heatmapData?: any;
  snapshotDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class AnalyticsSnapshotEntity {
  constructor(private readonly props: AnalyticsSnapshotProps) {}

  get id(): string { return this.props.id; }
  get organizationId(): string | null | undefined { return this.props.organizationId; }
  get tenantId(): string | null | undefined { return this.props.tenantId; }
  get schoolId(): string | null | undefined { return this.props.schoolId; }
  get studentId(): string | null | undefined { return this.props.studentId; }
  get teacherId(): string | null | undefined { return this.props.teacherId; }
  get entityType(): string { return this.props.entityType; }
  get overallMasteryScore(): number { return this.props.overallMasteryScore; }
  get attendancePercentage(): number { return this.props.attendancePercentage; }
  get assignmentCompletion(): number { return this.props.assignmentCompletion; }
  get learningVelocity(): number { return this.props.learningVelocity; }
  get retentionScore(): number { return this.props.retentionScore; }
  get studyTimeMins(): number { return this.props.studyTimeMins; }
  get riskLevel(): string { return this.props.riskLevel; }
  get weakTopics(): string[] { return this.props.weakTopics; }
  get strongTopics(): string[] { return this.props.strongTopics; }
  get kpiMetrics(): any { return this.props.kpiMetrics; }
  get heatmapData(): any { return this.props.heatmapData; }
  get snapshotDate(): Date { return this.props.snapshotDate; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
}

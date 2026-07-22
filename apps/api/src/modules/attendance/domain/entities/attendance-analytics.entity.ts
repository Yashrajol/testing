export interface AttendanceAnalyticsProps {
  id: string;
  organizationId?: string | null;
  tenantId?: string | null;
  studentId?: string | null;
  teacherId?: string | null;
  classId?: string | null;
  batchId?: string | null;
  subjectId?: string | null;
  period: string;
  totalDays: number;
  presentDays: number;
  absentDays: number;
  lateDays: number;
  halfDays: number;
  leaveDays: number;
  attendancePercentage: number;
  consecutiveAbsences: number;
  isDefaulter: boolean;
  riskScore: number;
  trends?: any;
  heatmap?: any;
  lastCalculatedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class AttendanceAnalyticsEntity {
  constructor(private readonly props: AttendanceAnalyticsProps) {}

  get id(): string { return this.props.id; }
  get organizationId(): string | null | undefined { return this.props.organizationId; }
  get tenantId(): string | null | undefined { return this.props.tenantId; }
  get studentId(): string | null | undefined { return this.props.studentId; }
  get teacherId(): string | null | undefined { return this.props.teacherId; }
  get classId(): string | null | undefined { return this.props.classId; }
  get batchId(): string | null | undefined { return this.props.batchId; }
  get subjectId(): string | null | undefined { return this.props.subjectId; }
  get period(): string { return this.props.period; }
  get totalDays(): number { return this.props.totalDays; }
  get presentDays(): number { return this.props.presentDays; }
  get absentDays(): number { return this.props.absentDays; }
  get lateDays(): number { return this.props.lateDays; }
  get halfDays(): number { return this.props.halfDays; }
  get leaveDays(): number { return this.props.leaveDays; }
  get attendancePercentage(): number { return this.props.attendancePercentage; }
  get consecutiveAbsences(): number { return this.props.consecutiveAbsences; }
  get isDefaulter(): boolean { return this.props.isDefaulter; }
  get riskScore(): number { return this.props.riskScore; }
  get trends(): any { return this.props.trends; }
  get heatmap(): any { return this.props.heatmap; }
  get lastCalculatedAt(): Date { return this.props.lastCalculatedAt; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }
}

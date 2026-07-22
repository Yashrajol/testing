import { LeaveStatus, LeaveType } from '../../constants/attendance.constants';

export interface LeaveRequestProps {
  id: string;
  organizationId?: string | null;
  tenantId?: string | null;
  applicantId: string;
  studentId?: string | null;
  applicantType: 'STUDENT' | 'TEACHER' | string;
  leaveType: LeaveType;
  startDate: Date;
  endDate: Date;
  totalDays: number;
  reason: string;
  attachmentUrls?: string[];
  status: LeaveStatus;
  approvedById?: string | null;
  rejectionReason?: string | null;
  appliedAt: Date;
  reviewedAt?: Date | null;
  metadata?: any;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class LeaveRequestEntity {
  constructor(private readonly props: LeaveRequestProps) {}

  get id(): string { return this.props.id; }
  get organizationId(): string | null | undefined { return this.props.organizationId; }
  get tenantId(): string | null | undefined { return this.props.tenantId; }
  get applicantId(): string { return this.props.applicantId; }
  get studentId(): string | null | undefined { return this.props.studentId; }
  get applicantType(): string { return this.props.applicantType; }
  get leaveType(): LeaveType { return this.props.leaveType; }
  get startDate(): Date { return this.props.startDate; }
  get endDate(): Date { return this.props.endDate; }
  get totalDays(): number { return this.props.totalDays; }
  get reason(): string { return this.props.reason; }
  get attachmentUrls(): string[] { return this.props.attachmentUrls || []; }
  get status(): LeaveStatus { return this.props.status; }
  get approvedById(): string | null | undefined { return this.props.approvedById; }
  get rejectionReason(): string | null | undefined { return this.props.rejectionReason; }
  get appliedAt(): Date { return this.props.appliedAt; }
  get reviewedAt(): Date | null | undefined { return this.props.reviewedAt; }
  get metadata(): any { return this.props.metadata; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }

  isPending(): boolean {
    return this.props.status === LeaveStatus.PENDING;
  }
}

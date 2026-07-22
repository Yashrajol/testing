import { AssignmentCategory, AssignmentStatus, GradingType } from '../../constants/assignments.constants';

export interface AssignmentProps {
  id: string;
  organizationId?: string | null;
  tenantId?: string | null;
  title: string;
  description?: string | null;
  category: AssignmentCategory;
  status: AssignmentStatus;
  batchId?: string | null;
  classId?: string | null;
  subjectId?: string | null;
  teacherId?: string | null;
  totalPoints: number;
  passingPoints?: number | null;
  gradingType: GradingType;
  isGroupAssignment?: boolean;
  maxGroupSize?: number | null;
  allowLateSubmission?: boolean;
  latePenaltyPercentPerDay?: number | null;
  maxSubmissions: number;
  dueDate: Date;
  publishedAt?: Date | null;
  archivedAt?: Date | null;
  gitRepoUrl?: string | null;
  metadata?: any;
  createdById?: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class AssignmentEntity {
  constructor(private readonly props: AssignmentProps) {}

  get id(): string { return this.props.id; }
  get organizationId(): string | null | undefined { return this.props.organizationId; }
  get tenantId(): string | null | undefined { return this.props.tenantId; }
  get title(): string { return this.props.title; }
  get description(): string | null | undefined { return this.props.description; }
  get category(): AssignmentCategory { return this.props.category; }
  get status(): AssignmentStatus { return this.props.status; }
  get batchId(): string | null | undefined { return this.props.batchId; }
  get classId(): string | null | undefined { return this.props.classId; }
  get subjectId(): string | null | undefined { return this.props.subjectId; }
  get teacherId(): string | null | undefined { return this.props.teacherId; }
  get totalPoints(): number { return this.props.totalPoints; }
  get passingPoints(): number | null | undefined { return this.props.passingPoints; }
  get gradingType(): GradingType { return this.props.gradingType; }
  get isGroupAssignment(): boolean { return !!this.props.isGroupAssignment; }
  get maxGroupSize(): number | null | undefined { return this.props.maxGroupSize; }
  get allowLateSubmission(): boolean { return this.props.allowLateSubmission !== false; }
  get latePenaltyPercentPerDay(): number | null | undefined { return this.props.latePenaltyPercentPerDay; }
  get maxSubmissions(): number { return this.props.maxSubmissions; }
  get dueDate(): Date { return this.props.dueDate; }
  get publishedAt(): Date | null | undefined { return this.props.publishedAt; }
  get archivedAt(): Date | null | undefined { return this.props.archivedAt; }
  get gitRepoUrl(): string | null | undefined { return this.props.gitRepoUrl; }
  get metadata(): any { return this.props.metadata; }
  get createdById(): string | null | undefined { return this.props.createdById; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }

  isPublished(): boolean {
    return this.props.status === AssignmentStatus.PUBLISHED;
  }

  isPastDueDate(currentDate: Date = new Date()): boolean {
    return currentDate.getTime() > this.props.dueDate.getTime();
  }
}

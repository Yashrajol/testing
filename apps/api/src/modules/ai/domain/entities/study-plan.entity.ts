export interface StudyPlanProps {
  id: string;
  organizationId?: string | null;
  tenantId?: string | null;
  studentId: string;
  title: string;
  planData: any;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class StudyPlanEntity {
  constructor(private readonly props: StudyPlanProps) {}

  get id(): string { return this.props.id; }
  get organizationId(): string | null | undefined { return this.props.organizationId; }
  get tenantId(): string | null | undefined { return this.props.tenantId; }
  get studentId(): string { return this.props.studentId; }
  get title(): string { return this.props.title; }
  get planData(): any { return this.props.planData; }
  get isActive(): boolean { return this.props.isActive; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }
}

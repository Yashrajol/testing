import { ReportType, ScheduleFrequency } from '../../constants/reporting.constants';

export interface ReportProps {
  id: string;
  organizationId?: string | null;
  tenantId?: string | null;
  type: ReportType;
  title: string;
  description?: string | null;
  config?: any;
  filters?: any;
  isScheduled: boolean;
  frequency: ScheduleFrequency;
  cronExpression?: string | null;
  recipients: string[];
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class ReportEntity {
  constructor(private readonly props: ReportProps) {}

  get id(): string { return this.props.id; }
  get organizationId(): string | null | undefined { return this.props.organizationId; }
  get tenantId(): string | null | undefined { return this.props.tenantId; }
  get type(): ReportType { return this.props.type; }
  get title(): string { return this.props.title; }
  get description(): string | null | undefined { return this.props.description; }
  get config(): any { return this.props.config; }
  get filters(): any { return this.props.filters; }
  get isScheduled(): boolean { return this.props.isScheduled; }
  get frequency(): ScheduleFrequency { return this.props.frequency; }
  get cronExpression(): string | null | undefined { return this.props.cronExpression; }
  get recipients(): string[] { return this.props.recipients; }
  get authorId(): string { return this.props.authorId; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }
}

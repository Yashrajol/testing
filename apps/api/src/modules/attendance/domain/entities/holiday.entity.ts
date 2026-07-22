import { HolidayType } from '../../constants/attendance.constants';

export interface HolidayProps {
  id: string;
  organizationId?: string | null;
  tenantId?: string | null;
  title: string;
  description?: string | null;
  date: Date;
  endDate?: Date | null;
  type: HolidayType;
  isRecurring?: boolean;
  affectsClasses?: boolean;
  metadata?: any;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class HolidayEntity {
  constructor(private readonly props: HolidayProps) {}

  get id(): string { return this.props.id; }
  get organizationId(): string | null | undefined { return this.props.organizationId; }
  get tenantId(): string | null | undefined { return this.props.tenantId; }
  get title(): string { return this.props.title; }
  get description(): string | null | undefined { return this.props.description; }
  get date(): Date { return this.props.date; }
  get endDate(): Date | null | undefined { return this.props.endDate; }
  get type(): HolidayType { return this.props.type; }
  get isRecurring(): boolean { return !!this.props.isRecurring; }
  get affectsClasses(): boolean { return this.props.affectsClasses !== false; }
  get metadata(): any { return this.props.metadata; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }
}

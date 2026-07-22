import { DashboardRole } from '../../constants/reporting.constants';
import { WidgetEntity } from './widget.entity';

export interface DashboardProps {
  id: string;
  organizationId?: string | null;
  tenantId?: string | null;
  schoolId?: string | null;
  role: DashboardRole;
  title: string;
  layoutConfig?: any;
  isDefault: boolean;
  ownerId?: string | null;
  widgets?: WidgetEntity[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class DashboardEntity {
  constructor(private readonly props: DashboardProps) {}

  get id(): string { return this.props.id; }
  get organizationId(): string | null | undefined { return this.props.organizationId; }
  get tenantId(): string | null | undefined { return this.props.tenantId; }
  get schoolId(): string | null | undefined { return this.props.schoolId; }
  get role(): DashboardRole { return this.props.role; }
  get title(): string { return this.props.title; }
  get layoutConfig(): any { return this.props.layoutConfig; }
  get isDefault(): boolean { return this.props.isDefault; }
  get ownerId(): string | null | undefined { return this.props.ownerId; }
  get widgets(): WidgetEntity[] | undefined { return this.props.widgets; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }
}

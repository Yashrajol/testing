import { ReportType, ExportFormat, ExportStatus } from '../../constants/reporting.constants';

export interface ExportJobProps {
  id: string;
  organizationId?: string | null;
  tenantId?: string | null;
  reportId?: string | null;
  reportType: ReportType;
  format: ExportFormat;
  status: ExportStatus;
  fileUrl?: string | null;
  fileSize?: number | null;
  errorMessage?: string | null;
  requestedBy: string;
  completedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export class ExportJobEntity {
  constructor(private readonly props: ExportJobProps) {}

  get id(): string { return this.props.id; }
  get organizationId(): string | null | undefined { return this.props.organizationId; }
  get tenantId(): string | null | undefined { return this.props.tenantId; }
  get reportId(): string | null | undefined { return this.props.reportId; }
  get reportType(): ReportType { return this.props.reportType; }
  get format(): ExportFormat { return this.props.format; }
  get status(): ExportStatus { return this.props.status; }
  get fileUrl(): string | null | undefined { return this.props.fileUrl; }
  get fileSize(): number | null | undefined { return this.props.fileSize; }
  get errorMessage(): string | null | undefined { return this.props.errorMessage; }
  get requestedBy(): string { return this.props.requestedBy; }
  get completedAt(): Date | null | undefined { return this.props.completedAt; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
}

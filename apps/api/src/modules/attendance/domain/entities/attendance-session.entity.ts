import { AttendanceType, AttendanceMode, SessionStatus } from '../../constants/attendance.constants';

export interface AttendanceSessionProps {
  id: string;
  organizationId?: string | null;
  tenantId?: string | null;
  type: AttendanceType;
  title: string;
  batchId?: string | null;
  subjectId?: string | null;
  classId?: string | null;
  teacherId?: string | null;
  date: Date;
  startTime?: Date | null;
  endTime?: Date | null;
  qrCode?: string | null;
  geofenceLat?: number | null;
  geofenceLng?: number | null;
  geofenceRadius?: number | null;
  status: SessionStatus | string;
  closedAt?: Date | null;
  metadata?: any;
  createdById?: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class AttendanceSessionEntity {
  constructor(private readonly props: AttendanceSessionProps) {}

  get id(): string { return this.props.id; }
  get organizationId(): string | null | undefined { return this.props.organizationId; }
  get tenantId(): string | null | undefined { return this.props.tenantId; }
  get type(): AttendanceType { return this.props.type; }
  get title(): string { return this.props.title; }
  get batchId(): string | null | undefined { return this.props.batchId; }
  get subjectId(): string | null | undefined { return this.props.subjectId; }
  get classId(): string | null | undefined { return this.props.classId; }
  get teacherId(): string | null | undefined { return this.props.teacherId; }
  get date(): Date { return this.props.date; }
  get startTime(): Date | null | undefined { return this.props.startTime; }
  get endTime(): Date | null | undefined { return this.props.endTime; }
  get qrCode(): string | null | undefined { return this.props.qrCode; }
  get geofenceLat(): number | null | undefined { return this.props.geofenceLat; }
  get geofenceLng(): number | null | undefined { return this.props.geofenceLng; }
  get geofenceRadius(): number | null | undefined { return this.props.geofenceRadius; }
  get status(): SessionStatus | string { return this.props.status; }
  get closedAt(): Date | null | undefined { return this.props.closedAt; }
  get metadata(): any { return this.props.metadata; }
  get createdById(): string | null | undefined { return this.props.createdById; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }

  isOpen(): boolean {
    return this.props.status === SessionStatus.OPEN;
  }
}

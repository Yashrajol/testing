import { AttendanceStatus, AttendanceMode, AttendanceType } from '../../constants/attendance.constants';

export interface AttendanceRecordProps {
  id: string;
  sessionId?: string | null;
  organizationId?: string | null;
  tenantId?: string | null;
  studentId?: string | null;
  teacherId?: string | null;
  batchId?: string | null;
  subjectId?: string | null;
  classId?: string | null;
  type: AttendanceType;
  status: AttendanceStatus;
  mode: AttendanceMode;
  date: Date;
  markedAt: Date;
  markedById?: string | null;
  remarks?: string | null;
  locationLat?: number | null;
  locationLng?: number | null;
  deviceInfo?: any;
  biometricHash?: string | null;
  verificationScore?: number | null;
  isCorrected?: boolean;
  correctedById?: string | null;
  correctionReason?: string | null;
  metadata?: any;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class AttendanceRecordEntity {
  constructor(private readonly props: AttendanceRecordProps) {}

  get id(): string { return this.props.id; }
  get sessionId(): string | null | undefined { return this.props.sessionId; }
  get organizationId(): string | null | undefined { return this.props.organizationId; }
  get tenantId(): string | null | undefined { return this.props.tenantId; }
  get studentId(): string | null | undefined { return this.props.studentId; }
  get teacherId(): string | null | undefined { return this.props.teacherId; }
  get batchId(): string | null | undefined { return this.props.batchId; }
  get subjectId(): string | null | undefined { return this.props.subjectId; }
  get classId(): string | null | undefined { return this.props.classId; }
  get type(): AttendanceType { return this.props.type; }
  get status(): AttendanceStatus { return this.props.status; }
  get mode(): AttendanceMode { return this.props.mode; }
  get date(): Date { return this.props.date; }
  get markedAt(): Date { return this.props.markedAt; }
  get markedById(): string | null | undefined { return this.props.markedById; }
  get remarks(): string | null | undefined { return this.props.remarks; }
  get locationLat(): number | null | undefined { return this.props.locationLat; }
  get locationLng(): number | null | undefined { return this.props.locationLng; }
  get deviceInfo(): any { return this.props.deviceInfo; }
  get biometricHash(): string | null | undefined { return this.props.biometricHash; }
  get verificationScore(): number | null | undefined { return this.props.verificationScore; }
  get isCorrected(): boolean { return !!this.props.isCorrected; }
  get correctedById(): string | null | undefined { return this.props.correctedById; }
  get correctionReason(): string | null | undefined { return this.props.correctionReason; }
  get metadata(): any { return this.props.metadata; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }

  isPresent(): boolean {
    return this.props.status === AttendanceStatus.PRESENT || this.props.status === AttendanceStatus.LATE;
  }
}

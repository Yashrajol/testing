export interface AttendancePolicyProps {
  id: string;
  organizationId?: string | null;
  tenantId?: string | null;
  name: string;
  minAttendancePercentage: number;
  lateThresholdMinutes: number;
  halfDayThresholdMinutes: number;
  autoMarkAbsentAfter?: string | null;
  allowSelfCheckIn?: boolean;
  enableGeofencing?: boolean;
  defaultGeofenceRadius?: number | null;
  enableQrCheckIn?: boolean;
  enableBiometricCheckIn?: boolean;
  metadata?: any;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class AttendancePolicyEntity {
  constructor(private readonly props: AttendancePolicyProps) {}

  get id(): string { return this.props.id; }
  get organizationId(): string | null | undefined { return this.props.organizationId; }
  get tenantId(): string | null | undefined { return this.props.tenantId; }
  get name(): string { return this.props.name; }
  get minAttendancePercentage(): number { return this.props.minAttendancePercentage; }
  get lateThresholdMinutes(): number { return this.props.lateThresholdMinutes; }
  get halfDayThresholdMinutes(): number { return this.props.halfDayThresholdMinutes; }
  get autoMarkAbsentAfter(): string | null | undefined { return this.props.autoMarkAbsentAfter; }
  get allowSelfCheckIn(): boolean { return !!this.props.allowSelfCheckIn; }
  get enableGeofencing(): boolean { return !!this.props.enableGeofencing; }
  get defaultGeofenceRadius(): number | null | undefined { return this.props.defaultGeofenceRadius; }
  get enableQrCheckIn(): boolean { return this.props.enableQrCheckIn !== false; }
  get enableBiometricCheckIn(): boolean { return !!this.props.enableBiometricCheckIn; }
  get metadata(): any { return this.props.metadata; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }
}

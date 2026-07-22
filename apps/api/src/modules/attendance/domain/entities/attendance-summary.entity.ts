export interface AttendanceSummaryProps {
  studentId: string;
  totalDays: number;
  presentDays: number;
  absentDays: number;
  lateDays: number;
  leaveDays: number;
  attendancePercentage: number;
}

export class AttendanceSummaryEntity {
  constructor(private readonly props: AttendanceSummaryProps) {}

  get studentId(): string { return this.props.studentId; }
  get totalDays(): number { return this.props.totalDays; }
  get presentDays(): number { return this.props.presentDays; }
  get absentDays(): number { return this.props.absentDays; }
  get lateDays(): number { return this.props.lateDays; }
  get leaveDays(): number { return this.props.leaveDays; }
  get attendancePercentage(): number { return this.props.attendancePercentage; }
}

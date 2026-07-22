export interface TeacherAnalyticsProps {
  teacherId: string;
  totalBatches: number;
  totalStudents: number;
  averageClassAttendance: number;
  averageClassScore: number;
  assignmentsSubmissionRate: number;
}

export class TeacherAnalyticsEntity {
  constructor(private readonly props: TeacherAnalyticsProps) {}

  get teacherId(): string { return this.props.teacherId; }
  get totalBatches(): number { return this.props.totalBatches; }
  get totalStudents(): number { return this.props.totalStudents; }
  get averageClassAttendance(): number { return this.props.averageClassAttendance; }
  get averageClassScore(): number { return this.props.averageClassScore; }
  get assignmentsSubmissionRate(): number { return this.props.assignmentsSubmissionRate; }
}

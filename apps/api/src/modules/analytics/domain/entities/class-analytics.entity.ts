export interface ClassAnalyticsProps {
  batchId: string;
  batchName: string;
  totalStudents: number;
  averageAttendancePercentage: number;
  averageAssessmentScore: number;
  assignmentCompletionPercentage: number;
  atRiskStudentsCount: number;
}

export class ClassAnalyticsEntity {
  constructor(private readonly props: ClassAnalyticsProps) {}

  get batchId(): string { return this.props.batchId; }
  get batchName(): string { return this.props.batchName; }
  get totalStudents(): number { return this.props.totalStudents; }
  get averageAttendancePercentage(): number { return this.props.averageAttendancePercentage; }
  get averageAssessmentScore(): number { return this.props.averageAssessmentScore; }
  get assignmentCompletionPercentage(): number { return this.props.assignmentCompletionPercentage; }
  get atRiskStudentsCount(): number { return this.props.atRiskStudentsCount; }
}

export interface StudentAnalyticsProps {
  studentId: string;
  overallMasteryScore: number;
  attendancePercentage: number;
  assignmentCompletion: number;
  learningVelocity: number;
  retentionScore: number;
  studyTimeMins: number;
  riskLevel: string;
  weakTopics: string[];
  strongTopics: string[];
  heatmapData?: any;
}

export class StudentAnalyticsEntity {
  constructor(private readonly props: StudentAnalyticsProps) {}

  get studentId(): string { return this.props.studentId; }
  get overallMasteryScore(): number { return this.props.overallMasteryScore; }
  get attendancePercentage(): number { return this.props.attendancePercentage; }
  get assignmentCompletion(): number { return this.props.assignmentCompletion; }
  get learningVelocity(): number { return this.props.learningVelocity; }
  get retentionScore(): number { return this.props.retentionScore; }
  get studyTimeMins(): number { return this.props.studyTimeMins; }
  get riskLevel(): string { return this.props.riskLevel; }
  get weakTopics(): string[] { return this.props.weakTopics; }
  get strongTopics(): string[] { return this.props.strongTopics; }
  get heatmapData(): any { return this.props.heatmapData; }
}

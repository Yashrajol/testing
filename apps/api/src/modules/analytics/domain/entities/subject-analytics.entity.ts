export interface SubjectAnalyticsProps {
  subjectId: string;
  subjectName: string;
  averageMastery: number;
  totalChapters: number;
  completedChapters: number;
  quizzesTaken: number;
  averageQuizScore: number;
}

export class SubjectAnalyticsEntity {
  constructor(private readonly props: SubjectAnalyticsProps) {}

  get subjectId(): string { return this.props.subjectId; }
  get subjectName(): string { return this.props.subjectName; }
  get averageMastery(): number { return this.props.averageMastery; }
  get totalChapters(): number { return this.props.totalChapters; }
  get completedChapters(): number { return this.props.completedChapters; }
  get quizzesTaken(): number { return this.props.quizzesTaken; }
  get averageQuizScore(): number { return this.props.averageQuizScore; }
}

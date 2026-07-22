export interface ChapterAnalyticsProps {
  chapterId: string;
  title: string;
  completionPercentage: number;
  totalTopics: number;
  completedTopics: number;
  averageAssessmentScore: number;
}

export class ChapterAnalyticsEntity {
  constructor(private readonly props: ChapterAnalyticsProps) {}

  get chapterId(): string { return this.props.chapterId; }
  get title(): string { return this.props.title; }
  get completionPercentage(): number { return this.props.completionPercentage; }
  get totalTopics(): number { return this.props.totalTopics; }
  get completedTopics(): number { return this.props.completedTopics; }
  get averageAssessmentScore(): number { return this.props.averageAssessmentScore; }
}

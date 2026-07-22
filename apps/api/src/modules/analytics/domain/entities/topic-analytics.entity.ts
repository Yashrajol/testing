export interface TopicAnalyticsProps {
  topicId: string;
  title: string;
  comprehensionRate: number;
  averageTimeSpentMins: number;
  difficultyIndex: number;
  totalAttempts: number;
}

export class TopicAnalyticsEntity {
  constructor(private readonly props: TopicAnalyticsProps) {}

  get topicId(): string { return this.props.topicId; }
  get title(): string { return this.props.title; }
  get comprehensionRate(): number { return this.props.comprehensionRate; }
  get averageTimeSpentMins(): number { return this.props.averageTimeSpentMins; }
  get difficultyIndex(): number { return this.props.difficultyIndex; }
  get totalAttempts(): number { return this.props.totalAttempts; }
}

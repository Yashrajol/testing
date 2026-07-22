export interface KnowledgeProfileProps {
  id: string;
  learningDnaId: string;
  topicId: string;
  topicName: string;
  masteryLevel: number;
  strongTopics: string[];
  weakTopics: string[];
  createdAt: Date;
  updatedAt: Date;
}

export class KnowledgeProfileEntity {
  constructor(private readonly props: KnowledgeProfileProps) {}

  get id(): string { return this.props.id; }
  get learningDnaId(): string { return this.props.learningDnaId; }
  get topicId(): string { return this.props.topicId; }
  get topicName(): string { return this.props.topicName; }
  get masteryLevel(): number { return this.props.masteryLevel; }
  get strongTopics(): string[] { return this.props.strongTopics; }
  get weakTopics(): string[] { return this.props.weakTopics; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
}

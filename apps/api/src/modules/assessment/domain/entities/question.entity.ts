export interface QuestionProps {
  id: string;
  bankId?: string | null;
  type: string;
  text: string;
  options?: any;
  correctAnswer?: string | null;
  difficulty: string;
  bloomsTaxonomy: string;
  learningObjectiveId?: string | null;
  estimatedSeconds?: number | null;
  marks: number;
  negativeMarks: number;
  tags?: string[];
  hints?: string[];
  explanation?: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class QuestionEntity {
  constructor(private readonly props: QuestionProps) {}

  get id(): string { return this.props.id; }
  get bankId(): string | null | undefined { return this.props.bankId; }
  get type(): string { return this.props.type; }
  get text(): string { return this.props.text; }
  get options(): any { return this.props.options; }
  get correctAnswer(): string | null | undefined { return this.props.correctAnswer; }
  get difficulty(): string { return this.props.difficulty; }
  get bloomsTaxonomy(): string { return this.props.bloomsTaxonomy; }
  get learningObjectiveId(): string | null | undefined { return this.props.learningObjectiveId; }
  get estimatedSeconds(): number | null | undefined { return this.props.estimatedSeconds; }
  get marks(): number { return this.props.marks; }
  get negativeMarks(): number { return this.props.negativeMarks; }
  get tags(): string[] | undefined { return this.props.tags; }
  get hints(): string[] | undefined { return this.props.hints; }
  get explanation(): string | null | undefined { return this.props.explanation; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }
}

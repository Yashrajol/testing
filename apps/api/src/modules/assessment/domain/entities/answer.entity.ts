export interface AnswerProps {
  id: string;
  attemptId: string;
  questionId: string;
  responseValue?: string | null;
  fileUrl?: string | null;
  isCorrect?: boolean | null;
  marksObtained?: number | null;
  feedback?: string | null;
  savedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class AnswerEntity {
  constructor(private readonly props: AnswerProps) {}

  get id(): string { return this.props.id; }
  get attemptId(): string { return this.props.attemptId; }
  get questionId(): string { return this.props.questionId; }
  get responseValue(): string | null | undefined { return this.props.responseValue; }
  get fileUrl(): string | null | undefined { return this.props.fileUrl; }
  get isCorrect(): boolean | null | undefined { return this.props.isCorrect; }
  get marksObtained(): number | null | undefined { return this.props.marksObtained; }
  get feedback(): string | null | undefined { return this.props.feedback; }
  get savedAt(): Date { return this.props.savedAt; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }
}

import { SubmissionStatus } from '../../constants/assignments.constants';

export interface SubmissionProps {
  id: string;
  assignmentId: string;
  studentId: string;
  attemptNumber: number;
  richTextContent?: string | null;
  externalUrl?: string | null;
  gitRepositoryUrl?: string | null;
  gitCommitHash?: string | null;
  status: SubmissionStatus;
  isLate: boolean;
  score?: number | null;
  isGraded: boolean;
  gradedAt?: Date | null;
  gradedById?: string | null;
  metadata?: any;
  submittedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class SubmissionEntity {
  constructor(private readonly props: SubmissionProps) {}

  get id(): string { return this.props.id; }
  get assignmentId(): string { return this.props.assignmentId; }
  get studentId(): string { return this.props.studentId; }
  get attemptNumber(): number { return this.props.attemptNumber; }
  get richTextContent(): string | null | undefined { return this.props.richTextContent; }
  get externalUrl(): string | null | undefined { return this.props.externalUrl; }
  get gitRepositoryUrl(): string | null | undefined { return this.props.gitRepositoryUrl; }
  get gitCommitHash(): string | null | undefined { return this.props.gitCommitHash; }
  get status(): SubmissionStatus { return this.props.status; }
  get isLate(): boolean { return this.props.isLate; }
  get score(): number | null | undefined { return this.props.score; }
  get isGraded(): boolean { return this.props.isGraded; }
  get gradedAt(): Date | null | undefined { return this.props.gradedAt; }
  get gradedById(): string | null | undefined { return this.props.gradedById; }
  get metadata(): any { return this.props.metadata; }
  get submittedAt(): Date { return this.props.submittedAt; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }

  isDraft(): boolean {
    return this.props.status === SubmissionStatus.DRAFT;
  }
}

export interface AttachmentProps {
  id: string;
  assignmentId?: string | null;
  submissionId?: string | null;
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSizeBytes?: number | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class AttachmentEntity {
  constructor(private readonly props: AttachmentProps) {}

  get id(): string { return this.props.id; }
  get assignmentId(): string | null | undefined { return this.props.assignmentId; }
  get submissionId(): string | null | undefined { return this.props.submissionId; }
  get fileName(): string { return this.props.fileName; }
  get fileUrl(): string { return this.props.fileUrl; }
  get fileType(): string { return this.props.fileType; }
  get fileSizeBytes(): number | null | undefined { return this.props.fileSizeBytes; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }
}

import { TargetAudienceRole } from '../../constants/notifications.constants';

export interface AnnouncementProps {
  id: string;
  organizationId?: string | null;
  schoolId?: string | null;
  classId?: string | null;
  batchId?: string | null;
  courseId?: string | null;
  targetRole: TargetAudienceRole;
  targetUserId?: string | null;
  title: string;
  content: string;
  authorId: string;
  isPublished: boolean;
  publishedAt?: Date | null;
  expiresAt?: Date | null;
  attachments?: any;
  metadata?: any;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class AnnouncementEntity {
  constructor(private readonly props: AnnouncementProps) {}

  get id(): string { return this.props.id; }
  get organizationId(): string | null | undefined { return this.props.organizationId; }
  get schoolId(): string | null | undefined { return this.props.schoolId; }
  get classId(): string | null | undefined { return this.props.classId; }
  get batchId(): string | null | undefined { return this.props.batchId; }
  get courseId(): string | null | undefined { return this.props.courseId; }
  get targetRole(): TargetAudienceRole { return this.props.targetRole; }
  get targetUserId(): string | null | undefined { return this.props.targetUserId; }
  get title(): string { return this.props.title; }
  get content(): string { return this.props.content; }
  get authorId(): string { return this.props.authorId; }
  get isPublished(): boolean { return this.props.isPublished; }
  get publishedAt(): Date | null | undefined { return this.props.publishedAt; }
  get expiresAt(): Date | null | undefined { return this.props.expiresAt; }
  get attachments(): any { return this.props.attachments; }
  get metadata(): any { return this.props.metadata; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }
}

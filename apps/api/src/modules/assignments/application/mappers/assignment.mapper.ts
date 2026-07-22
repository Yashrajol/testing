import { AssignmentEntity } from '../../domain/entities/assignment.entity';
import { SubmissionEntity } from '../../domain/entities/submission.entity';
import { RubricEntity } from '../../domain/entities/rubric.entity';
import { FeedbackEntity } from '../../domain/entities/feedback.entity';
import { AttachmentEntity } from '../../domain/entities/attachment.entity';
import {
  AssignmentResponseDto,
  SubmissionResponseDto,
  RubricResponseDto,
  FeedbackResponseDto,
  AttachmentResponseDto,
} from '../dtos/assignment-response.dto';

export class AssignmentMapper {
  static toAssignmentDto(
    entity: AssignmentEntity,
    rubrics: RubricEntity[] = [],
    attachments: AttachmentEntity[] = [],
  ): AssignmentResponseDto {
    return {
      id: entity.id,
      title: entity.title,
      description: entity.description || null,
      category: entity.category,
      status: entity.status,
      batchId: entity.batchId || null,
      totalPoints: entity.totalPoints,
      gradingType: entity.gradingType,
      dueDate: entity.dueDate,
      allowLateSubmission: entity.allowLateSubmission,
      maxSubmissions: entity.maxSubmissions,
      rubrics: rubrics.map((r) => AssignmentMapper.toRubricDto(r)),
      attachments: attachments.map((a) => AssignmentMapper.toAttachmentDto(a)),
    };
  }

  static toSubmissionDto(
    entity: SubmissionEntity,
    attachments: AttachmentEntity[] = [],
    feedbacks: FeedbackEntity[] = [],
  ): SubmissionResponseDto {
    return {
      id: entity.id,
      assignmentId: entity.assignmentId,
      studentId: entity.studentId,
      attemptNumber: entity.attemptNumber,
      richTextContent: entity.richTextContent || null,
      gitRepositoryUrl: entity.gitRepositoryUrl || null,
      status: entity.status,
      isLate: entity.isLate,
      score: entity.score || null,
      isGraded: entity.isGraded,
      submittedAt: entity.submittedAt,
      attachments: attachments.map((a) => AssignmentMapper.toAttachmentDto(a)),
      feedbacks: feedbacks.map((f) => AssignmentMapper.toFeedbackDto(f)),
    };
  }

  static toRubricDto(entity: RubricEntity): RubricResponseDto {
    return {
      id: entity.id,
      title: entity.title,
      totalMaxPoints: entity.totalMaxPoints,
      criteria: entity.criteria.map((c) => ({
        id: c.id,
        title: c.title,
        description: c.description || null,
        maxPoints: c.maxPoints,
        weightage: c.weightage,
      })),
    };
  }

  static toFeedbackDto(entity: FeedbackEntity): FeedbackResponseDto {
    return {
      id: entity.id,
      authorId: entity.authorId,
      authorType: entity.authorType,
      comment: entity.comment,
      audioFeedbackUrl: entity.audioFeedbackUrl || null,
    };
  }

  static toAttachmentDto(entity: AttachmentEntity): AttachmentResponseDto {
    return {
      id: entity.id,
      fileName: entity.fileName,
      fileUrl: entity.fileUrl,
      fileType: entity.fileType,
      fileSizeBytes: entity.fileSizeBytes || null,
    };
  }
}

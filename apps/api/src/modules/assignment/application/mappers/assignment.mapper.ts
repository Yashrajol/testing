import { AssignmentEntity } from '../../domain/entities/assignment.entity';
import { AssignmentSubmissionEntity } from '../../domain/entities/assignment-submission.entity';
import { DeadlineExtensionEntity } from '../../domain/entities/deadline-extension.entity';
import {
  AssignmentResponseDto,
  SubmissionResponseDto,
  ExtensionResponseDto,
} from '../dtos/assignment-response.dto';
import { AssignmentStatus, SubmissionStatus } from '../../constants/assignment.constants';

export class AssignmentMapper {
  static toAssignmentDto(entity: AssignmentEntity): AssignmentResponseDto {
    return {
      id: entity.id,
      batchId: entity.batchId || '',
      title: entity.title,
      description: entity.description || undefined,
      totalPoints: entity.totalPoints,
      dueDate: entity.dueDate,
      allowLate: entity.allowLate,
      allowResubmit: entity.allowResubmit,
      maxSubmissions: entity.maxSubmissions,
      status: entity.status as AssignmentStatus,
      publishedAt: entity.publishedAt || undefined,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toSubmissionDto(entity: AssignmentSubmissionEntity): SubmissionResponseDto {
    return {
      id: entity.id,
      assignmentId: entity.assignmentId,
      studentId: entity.studentId,
      attemptNumber: entity.attemptNumber,
      content: entity.content || undefined,
      submittedAt: entity.submittedAt,
      isLate: entity.isLate,
      status: entity.status as SubmissionStatus,
      score: entity.score !== null && entity.score !== undefined ? entity.score : undefined,
      evaluatedAt: entity.evaluatedAt || undefined,
      evaluatorId: entity.evaluatorId || undefined,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toExtensionDto(entity: DeadlineExtensionEntity): ExtensionResponseDto {
    return {
      id: entity.id,
      assignmentId: entity.assignmentId,
      studentId: entity.studentId,
      extendedDueDate: entity.extendedDueDate,
      reason: entity.reason || undefined,
      grantedBy: entity.grantedBy,
      createdAt: entity.createdAt,
    };
  }
}

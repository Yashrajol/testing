import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AssignmentCategory, AssignmentStatus, SubmissionStatus, GradingType } from '../../constants/assignments.constants';

export class AttachmentResponseDto {
  @ApiProperty({ example: 'attachment-uuid-123' })
  id!: string;

  @ApiProperty({ example: 'solution.zip' })
  fileName!: string;

  @ApiProperty({ example: 'https://storage.vedhkrit.com/submissions/solution.zip' })
  fileUrl!: string;

  @ApiProperty({ example: 'application/zip' })
  fileType!: string;

  @ApiPropertyOptional({ example: 102400 })
  fileSizeBytes?: number | null;
}

export class FeedbackResponseDto {
  @ApiProperty({ example: 'feedback-uuid-123' })
  id!: string;

  @ApiProperty({ example: 'teacher-uuid-123' })
  authorId!: string;

  @ApiProperty({ example: 'TEACHER' })
  authorType!: string;

  @ApiProperty({ example: 'Great modularization and unit test coverage.' })
  comment!: string;

  @ApiPropertyOptional({ example: 'https://storage.vedhkrit.com/audio/feedback.mp3' })
  audioFeedbackUrl?: string | null;
}

export class RubricCriterionResponseDto {
  @ApiProperty({ example: 'criterion-uuid-123' })
  id!: string;

  @ApiProperty({ example: 'Architecture & Design' })
  title!: string;

  @ApiPropertyOptional({ example: 'Use of CQRS and SOLID' })
  description?: string | null;

  @ApiProperty({ example: 25.0 })
  maxPoints!: number;

  @ApiProperty({ example: 1.0 })
  weightage!: number;
}

export class RubricResponseDto {
  @ApiProperty({ example: 'rubric-uuid-123' })
  id!: string;

  @ApiProperty({ example: 'Capstone Grading Rubric' })
  title!: string;

  @ApiProperty({ example: 100.0 })
  totalMaxPoints!: number;

  @ApiProperty({ type: [RubricCriterionResponseDto] })
  criteria?: RubricCriterionResponseDto[];
}

export class SubmissionResponseDto {
  @ApiProperty({ example: 'submission-uuid-123' })
  id!: string;

  @ApiProperty({ example: 'assignment-uuid-123' })
  assignmentId!: string;

  @ApiProperty({ example: 'student-uuid-123' })
  studentId!: string;

  @ApiProperty({ example: 1 })
  attemptNumber!: number;

  @ApiPropertyOptional({ example: '<p>Submission text</p>' })
  richTextContent?: string | null;

  @ApiPropertyOptional({ example: 'https://github.com/org/repo' })
  gitRepositoryUrl?: string | null;

  @ApiProperty({ enum: SubmissionStatus, example: SubmissionStatus.SUBMITTED })
  status!: SubmissionStatus;

  @ApiProperty({ example: false })
  isLate!: boolean;

  @ApiPropertyOptional({ example: 92.0 })
  score?: number | null;

  @ApiProperty({ example: false })
  isGraded!: boolean;

  @ApiProperty({ example: '2026-07-21T10:00:00.000Z' })
  submittedAt!: Date;

  @ApiPropertyOptional({ type: [AttachmentResponseDto] })
  attachments?: AttachmentResponseDto[];

  @ApiPropertyOptional({ type: [FeedbackResponseDto] })
  feedbacks?: FeedbackResponseDto[];
}

export class AssignmentResponseDto {
  @ApiProperty({ example: 'assignment-uuid-123' })
  id!: string;

  @ApiProperty({ example: 'Microservices Capstone Project' })
  title!: string;

  @ApiPropertyOptional({ example: 'Full stack development project' })
  description?: string | null;

  @ApiProperty({ enum: AssignmentCategory, example: AssignmentCategory.PROJECT })
  category!: AssignmentCategory;

  @ApiProperty({ enum: AssignmentStatus, example: AssignmentStatus.PUBLISHED })
  status!: AssignmentStatus;

  @ApiPropertyOptional({ example: 'batch-uuid-123' })
  batchId?: string | null;

  @ApiProperty({ example: 100.0 })
  totalPoints!: number;

  @ApiProperty({ enum: GradingType, example: GradingType.MANUAL })
  gradingType!: GradingType;

  @ApiProperty({ example: '2026-08-15T23:59:59.000Z' })
  dueDate!: Date;

  @ApiProperty({ example: true })
  allowLateSubmission!: boolean;

  @ApiProperty({ example: 3 })
  maxSubmissions!: number;

  @ApiPropertyOptional({ type: [RubricResponseDto] })
  rubrics?: RubricResponseDto[];

  @ApiPropertyOptional({ type: [AttachmentResponseDto] })
  attachments?: AttachmentResponseDto[];
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vedhkrit/database';
import { IAssignmentRepository } from './assignment.repository.interface';
import { AssignmentEntity } from '../domain/entities/assignment.entity';
import { SubmissionEntity } from '../domain/entities/submission.entity';
import { RubricEntity } from '../domain/entities/rubric.entity';
import { FeedbackEntity } from '../domain/entities/feedback.entity';
import { AttachmentEntity } from '../domain/entities/attachment.entity';
import { AssignmentFilterOptions, SubmissionFilterOptions } from '../types/assignments.types';
import { SubmissionStatus, AssignmentCategory, AssignmentStatus, GradingType } from '../constants/assignments.constants';

@Injectable()
export class AssignmentRepository implements IAssignmentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createAssignment(data: any): Promise<AssignmentEntity> {
    const raw = await this.prisma.assignment.create({ data });
    return this.mapAssignment(raw);
  }

  async updateAssignment(id: string, data: any): Promise<AssignmentEntity> {
    const raw = await this.prisma.assignment.update({
      where: { id },
      data,
    });
    return this.mapAssignment(raw);
  }

  async deleteAssignment(id: string): Promise<void> {
    await this.prisma.assignment.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async findAssignmentById(id: string): Promise<AssignmentEntity | null> {
    const raw = await this.prisma.assignment.findFirst({
      where: { id, deletedAt: null },
    });
    return raw ? this.mapAssignment(raw) : null;
  }

  async findAssignments(options: AssignmentFilterOptions): Promise<AssignmentEntity[]> {
    const where: any = { deletedAt: null };
    if (options.organizationId) where.organizationId = options.organizationId;
    if (options.tenantId) where.tenantId = options.tenantId;
    if (options.batchId) where.batchId = options.batchId;
    if (options.classId) where.classId = options.classId;
    if (options.subjectId) where.subjectId = options.subjectId;
    if (options.teacherId) where.teacherId = options.teacherId;
    if (options.category) where.category = options.category;
    if (options.status) where.status = options.status;

    const raws = await this.prisma.assignment.findMany({
      where,
      skip: options.skip,
      take: options.take,
      orderBy: { createdAt: 'desc' },
    });

    return raws.map((r) => this.mapAssignment(r));
  }

  async createSubmission(data: any): Promise<SubmissionEntity> {
    const raw = await this.prisma.submission.create({ data });
    return this.mapSubmission(raw);
  }

  async updateSubmissionStatus(id: string, status: SubmissionStatus): Promise<SubmissionEntity> {
    const raw = await this.prisma.submission.update({
      where: { id },
      data: { status },
    });
    return this.mapSubmission(raw);
  }

  async gradeSubmission(
    id: string,
    data: { score: number; gradedById: string; status?: SubmissionStatus },
  ): Promise<SubmissionEntity> {
    const raw = await this.prisma.submission.update({
      where: { id },
      data: {
        score: data.score,
        gradedById: data.gradedById,
        isGraded: true,
        gradedAt: new Date(),
        status: data.status || SubmissionStatus.GRADED,
      },
    });
    return this.mapSubmission(raw);
  }

  async findSubmissionById(id: string): Promise<SubmissionEntity | null> {
    const raw = await this.prisma.submission.findFirst({
      where: { id, deletedAt: null },
    });
    return raw ? this.mapSubmission(raw) : null;
  }

  async findSubmissions(options: SubmissionFilterOptions): Promise<SubmissionEntity[]> {
    const where: any = { deletedAt: null };
    if (options.assignmentId) where.assignmentId = options.assignmentId;
    if (options.studentId) where.studentId = options.studentId;
    if (options.status) where.status = options.status;
    if (options.isLate !== undefined) where.isLate = options.isLate;
    if (options.isGraded !== undefined) where.isGraded = options.isGraded;

    const raws = await this.prisma.submission.findMany({
      where,
      skip: options.skip,
      take: options.take,
      orderBy: { submittedAt: 'desc' },
    });

    return raws.map((r) => this.mapSubmission(r));
  }

  async findSubmissionsByStudent(assignmentId: string, studentId: string): Promise<SubmissionEntity[]> {
    const raws = await this.prisma.submission.findMany({
      where: { assignmentId, studentId, deletedAt: null },
      orderBy: { attemptNumber: 'asc' },
    });

    return raws.map((r) => this.mapSubmission(r));
  }

  async createRubric(data: any): Promise<RubricEntity> {
    const raw = await this.prisma.assignmentRubric.create({
      data,
      include: { criteria: true },
    });
    return this.mapRubric(raw);
  }

  async findRubricsByAssignment(assignmentId: string): Promise<RubricEntity[]> {
    const raws = await this.prisma.assignmentRubric.findMany({
      where: { assignmentId, deletedAt: null },
      include: { criteria: true },
    });

    return raws.map((r) => this.mapRubric(r));
  }

  async createFeedback(data: any): Promise<FeedbackEntity> {
    const raw = await this.prisma.feedback.create({ data });
    return this.mapFeedback(raw);
  }

  async findFeedbacksBySubmission(submissionId: string): Promise<FeedbackEntity[]> {
    const raws = await this.prisma.feedback.findMany({
      where: { submissionId, deletedAt: null },
      orderBy: { createdAt: 'asc' },
    });

    return raws.map((r) => this.mapFeedback(r));
  }

  async createAttachment(data: any): Promise<AttachmentEntity> {
    const raw = await this.prisma.attachment.create({ data });
    return this.mapAttachment(raw);
  }

  async findAttachmentsByAssignment(assignmentId: string): Promise<AttachmentEntity[]> {
    const raws = await this.prisma.attachment.findMany({
      where: { assignmentId, deletedAt: null },
    });

    return raws.map((r) => this.mapAttachment(r));
  }

  async findAttachmentsBySubmission(submissionId: string): Promise<AttachmentEntity[]> {
    const raws = await this.prisma.attachment.findMany({
      where: { submissionId, deletedAt: null },
    });

    return raws.map((r) => this.mapAttachment(r));
  }

  private mapAssignment(raw: any): AssignmentEntity {
    return new AssignmentEntity({
      id: raw.id,
      organizationId: raw.organizationId,
      tenantId: raw.tenantId,
      title: raw.title,
      description: raw.description,
      category: raw.category as AssignmentCategory,
      status: raw.status as AssignmentStatus,
      batchId: raw.batchId,
      classId: raw.classId,
      subjectId: raw.subjectId,
      teacherId: raw.teacherId,
      totalPoints: raw.totalPoints,
      passingPoints: raw.passingPoints,
      gradingType: raw.gradingType as GradingType,
      isGroupAssignment: raw.isGroupAssignment,
      maxGroupSize: raw.maxGroupSize,
      allowLateSubmission: raw.allowLateSubmission,
      latePenaltyPercentPerDay: raw.latePenaltyPercentPerDay,
      maxSubmissions: raw.maxSubmissions,
      dueDate: raw.dueDate,
      publishedAt: raw.publishedAt,
      archivedAt: raw.archivedAt,
      gitRepoUrl: raw.gitRepoUrl,
      metadata: raw.metadata,
      createdById: raw.createdById,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: raw.deletedAt,
    });
  }

  private mapSubmission(raw: any): SubmissionEntity {
    return new SubmissionEntity({
      id: raw.id,
      assignmentId: raw.assignmentId,
      studentId: raw.studentId,
      attemptNumber: raw.attemptNumber,
      richTextContent: raw.richTextContent,
      externalUrl: raw.externalUrl,
      gitRepositoryUrl: raw.gitRepositoryUrl,
      gitCommitHash: raw.gitCommitHash,
      status: raw.status as SubmissionStatus,
      isLate: raw.isLate,
      score: raw.score,
      isGraded: raw.isGraded,
      gradedAt: raw.gradedAt,
      gradedById: raw.gradedById,
      metadata: raw.metadata,
      submittedAt: raw.submittedAt,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: raw.deletedAt,
    });
  }

  private mapRubric(raw: any): RubricEntity {
    return new RubricEntity({
      id: raw.id,
      assignmentId: raw.assignmentId,
      title: raw.title,
      description: raw.description,
      totalMaxPoints: raw.totalMaxPoints,
      criteria: (raw.criteria || []).map((c: any) => ({
        id: c.id,
        rubricId: c.rubricId,
        title: c.title,
        description: c.description,
        maxPoints: c.maxPoints,
        weightage: c.weightage,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt,
        deletedAt: c.deletedAt,
      })),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: raw.deletedAt,
    });
  }

  private mapFeedback(raw: any): FeedbackEntity {
    return new FeedbackEntity({
      id: raw.id,
      submissionId: raw.submissionId,
      authorId: raw.authorId,
      authorType: raw.authorType,
      comment: raw.comment,
      criteriaScores: raw.criteriaScores,
      audioFeedbackUrl: raw.audioFeedbackUrl,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: raw.deletedAt,
    });
  }

  private mapAttachment(raw: any): AttachmentEntity {
    return new AttachmentEntity({
      id: raw.id,
      assignmentId: raw.assignmentId,
      submissionId: raw.submissionId,
      fileName: raw.fileName,
      fileUrl: raw.fileUrl,
      fileType: raw.fileType,
      fileSizeBytes: raw.fileSizeBytes,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: raw.deletedAt,
    });
  }
}

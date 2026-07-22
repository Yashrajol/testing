import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vedhkrit/database';
import { IAssignmentRepository } from './assignment.repository.interface';
import { AssignmentFilterOptions, SubmissionFilterOptions } from '../types/assignment.types';
import { AssignmentEntity } from '../domain/entities/assignment.entity';
import { AssignmentSubmissionEntity } from '../domain/entities/assignment-submission.entity';
import { FeedbackEntity } from '../domain/entities/feedback.entity';
import { DeadlineExtensionEntity } from '../domain/entities/deadline-extension.entity';

@Injectable()
export class AssignmentRepository implements IAssignmentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createAssignment(data: any): Promise<any> {
    const raw = await this.prisma.assignment.create({ data });
    return new AssignmentEntity(raw);
  }

  async findAssignmentById(id: string): Promise<any | null> {
    const raw = await this.prisma.assignment.findFirst({
      where: { id, deletedAt: null },
      include: { rubrics: true, attachments: true },
    });
    return raw ? new AssignmentEntity(raw) : null;
  }

  async publishAssignment(id: string): Promise<any> {
    const raw = await this.prisma.assignment.update({
      where: { id },
      data: { status: 'PUBLISHED', publishedAt: new Date() },
    });
    return new AssignmentEntity(raw);
  }

  async findAssignments(options: AssignmentFilterOptions): Promise<{ items: any[]; total: number }> {
    const where: any = { deletedAt: null };
    if (options.batchId) where.batchId = options.batchId;
    if (options.status) where.status = options.status;
    if (options.search) {
      where.title = { contains: options.search, mode: 'insensitive' };
    }

    const [items, total] = await Promise.all([
      this.prisma.assignment.findMany({
        where,
        skip: options.skip || 0,
        take: options.take || 20,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.assignment.count({ where }),
    ]);

    return {
      items: items.map((raw) => new AssignmentEntity(raw)),
      total,
    };
  }

  async createSubmission(data: any): Promise<any> {
    const raw = await this.prisma.submission.create({ data });
    return new AssignmentSubmissionEntity(raw);
  }

  async findSubmissionById(id: string): Promise<any | null> {
    const raw = await this.prisma.submission.findFirst({
      where: { id, deletedAt: null },
      include: { attachments: true, feedbacks: true },
    });
    return raw ? new AssignmentSubmissionEntity(raw) : null;
  }

  async findLatestSubmission(assignmentId: string, studentId: string): Promise<any | null> {
    const raw = await this.prisma.submission.findFirst({
      where: { assignmentId, studentId, deletedAt: null },
      orderBy: { attemptNumber: 'desc' },
    });
    return raw ? new AssignmentSubmissionEntity(raw) : null;
  }

  async updateSubmissionEvaluation(id: string, score: number, evaluatorId?: string): Promise<any> {
    const raw = await this.prisma.submission.update({
      where: { id },
      data: {
        score,
        gradedById: evaluatorId,
        status: 'GRADED',
        gradedAt: new Date(),
      },
    });
    return new AssignmentSubmissionEntity(raw);
  }

  async reopenSubmission(id: string): Promise<any> {
    const raw = await this.prisma.submission.update({
      where: { id },
      data: { status: 'REOPENED' },
    });
    return new AssignmentSubmissionEntity(raw);
  }

  async findSubmissions(options: SubmissionFilterOptions): Promise<{ items: any[]; total: number }> {
    const where: any = { deletedAt: null };
    if (options.assignmentId) where.assignmentId = options.assignmentId;
    if (options.studentId) where.studentId = options.studentId;
    if (options.status) where.status = options.status;

    const [items, total] = await Promise.all([
      this.prisma.submission.findMany({
        where,
        skip: options.skip || 0,
        take: options.take || 20,
        orderBy: { submittedAt: 'desc' },
      }),
      this.prisma.submission.count({ where }),
    ]);

    return {
      items: items.map((raw) => new AssignmentSubmissionEntity(raw)),
      total,
    };
  }

  async addFeedback(data: any): Promise<any> {
    const raw = await this.prisma.feedback.create({ data });
    return new FeedbackEntity(raw);
  }

  async grantExtension(data: any): Promise<any> {
    const raw = await this.prisma.deadlineExtension.create({ data });
    return new DeadlineExtensionEntity(raw);
  }

  async findActiveExtension(assignmentId: string, studentId: string): Promise<any | null> {
    const raw = await this.prisma.deadlineExtension.findFirst({
      where: { assignmentId, studentId, deletedAt: null },
      orderBy: { extendedDueDate: 'desc' },
    });
    return raw ? new DeadlineExtensionEntity(raw) : null;
  }
}

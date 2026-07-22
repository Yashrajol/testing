import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vedhkrit/database';
import { IAssessmentRepository } from './assessment.repository.interface';
import { AssessmentFilterOptions } from '../types/assessment.types';
import { AssessmentEntity } from '../domain/entities/assessment.entity';
import { QuestionBankEntity } from '../domain/entities/question-bank.entity';
import { QuestionEntity } from '../domain/entities/question.entity';
import { AssessmentAttemptEntity } from '../domain/entities/assessment-attempt.entity';
import { AnswerEntity } from '../domain/entities/answer.entity';
import { RubricEntity } from '../domain/entities/rubric.entity';
import { GradingEntity } from '../domain/entities/grading.entity';
import { CompetencyScoreEntity } from '../domain/entities/competency-score.entity';

@Injectable()
export class AssessmentRepository implements IAssessmentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createAssessment(data: any): Promise<any> {
    const raw = await this.prisma.assessment.create({ data });
    return new AssessmentEntity(raw);
  }

  async findAssessmentById(id: string): Promise<any | null> {
    const raw = await this.prisma.assessment.findFirst({
      where: { id, deletedAt: null },
      include: { rubrics: true },
    });
    return raw ? new AssessmentEntity(raw) : null;
  }

  async findAssessments(options: AssessmentFilterOptions): Promise<{ items: any[]; total: number }> {
    const where: any = { deletedAt: null };
    if (options.type) where.type = options.type;
    if (options.search) {
      where.OR = [{ title: { contains: options.search, mode: 'insensitive' } }];
    }

    const [items, total] = await Promise.all([
      this.prisma.assessment.findMany({
        where,
        skip: options.skip || 0,
        take: options.take || 20,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.assessment.count({ where }),
    ]);

    return {
      items: items.map((raw) => new AssessmentEntity(raw)),
      total,
    };
  }

  async createQuestionBank(data: any): Promise<any> {
    const raw = await this.prisma.questionBank.create({ data });
    return new QuestionBankEntity(raw);
  }

  async createQuestion(data: any): Promise<any> {
    const raw = await this.prisma.question.create({ data });
    return new QuestionEntity(raw);
  }

  async findQuestionById(id: string): Promise<any | null> {
    const raw = await this.prisma.question.findFirst({ where: { id, deletedAt: null } });
    return raw ? new QuestionEntity(raw) : null;
  }

  async startAttempt(data: any): Promise<any> {
    const raw = await this.prisma.assessmentAttempt.create({ data });
    return new AssessmentAttemptEntity(raw);
  }

  async findAttemptById(id: string): Promise<any | null> {
    const raw = await this.prisma.assessmentAttempt.findFirst({
      where: { id, deletedAt: null },
      include: { answers: true, gradings: true, competencyScores: true },
    });
    return raw ? new AssessmentAttemptEntity(raw) : null;
  }

  async updateAttempt(id: string, data: any): Promise<any> {
    const raw = await this.prisma.assessmentAttempt.update({
      where: { id },
      data,
    });
    return new AssessmentAttemptEntity(raw);
  }

  async findAttemptsByStudent(studentId: string): Promise<any[]> {
    const items = await this.prisma.assessmentAttempt.findMany({
      where: { studentId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return items.map((raw) => new AssessmentAttemptEntity(raw));
  }

  async saveAnswer(data: any): Promise<any> {
    const raw = await this.prisma.answer.create({ data });
    return new AnswerEntity(raw);
  }

  async findAnswersByAttempt(attemptId: string): Promise<any[]> {
    const items = await this.prisma.answer.findMany({
      where: { attemptId, deletedAt: null },
    });
    return items.map((raw) => new AnswerEntity(raw));
  }

  async createRubric(data: any): Promise<any> {
    const raw = await this.prisma.rubric.create({ data });
    return new RubricEntity(raw);
  }

  async saveGrading(data: any): Promise<any> {
    const raw = await this.prisma.grading.create({ data });
    return new GradingEntity(raw);
  }

  async saveCompetencyScore(data: any): Promise<any> {
    const raw = await this.prisma.competencyScore.create({ data });
    return new CompetencyScoreEntity(raw);
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vedhkrit/database';
import { IAIRepository } from './ai.repository.interface';
import { AIRequestEntity } from '../domain/entities/ai-request.entity';
import { AIResponseEntity } from '../domain/entities/ai-response.entity';
import { StudyPlanEntity } from '../domain/entities/study-plan.entity';
import { RecommendationEntity } from '../domain/entities/recommendation.entity';
import { RiskAnalysisEntity } from '../domain/entities/risk-analysis.entity';
import { CareerAdviceEntity } from '../domain/entities/career-advice.entity';
import { LearningInsightEntity } from '../domain/entities/learning-insight.entity';
import { AIRequestFilterOptions } from '../types/ai.types';

@Injectable()
export class AIRepository implements IAIRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createRequest(data: any): Promise<AIRequestEntity> {
    const raw = await this.prisma.aIRequest.create({ data });
    return this.mapRequest(raw);
  }

  async updateRequestCost(id: string, inputTokens: number, cost: number): Promise<AIRequestEntity> {
    const raw = await this.prisma.aIRequest.update({
      where: { id },
      data: { inputTokens, estimatedCost: cost },
    });
    return this.mapRequest(raw);
  }

  async createResponse(data: any): Promise<AIResponseEntity> {
    const raw = await this.prisma.aIResponse.create({ data });
    return this.mapResponse(raw);
  }

  async findRequests(options?: AIRequestFilterOptions): Promise<AIRequestEntity[]> {
    const where: any = {};
    if (options?.organizationId) where.organizationId = options.organizationId;
    if (options?.tenantId) where.tenantId = options.tenantId;
    if (options?.userId) where.userId = options.userId;
    if (options?.provider) where.provider = options.provider;

    const raws = await this.prisma.aIRequest.findMany({
      where,
      skip: options?.skip,
      take: options?.take,
      orderBy: { createdAt: 'desc' },
    });

    return raws.map((r) => this.mapRequest(r));
  }

  async createStudyPlan(data: any): Promise<StudyPlanEntity> {
    const raw = await this.prisma.studyPlan.create({ data });
    return this.mapStudyPlan(raw);
  }

  async findStudyPlans(studentId: string): Promise<StudyPlanEntity[]> {
    const raws = await this.prisma.studyPlan.findMany({
      where: { studentId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return raws.map((r) => this.mapStudyPlan(r));
  }

  async createRecommendation(data: any): Promise<RecommendationEntity> {
    const raw = await this.prisma.aIRecommendation.create({ data });
    return this.mapRecommendation(raw);
  }

  async findRecommendations(targetId: string): Promise<RecommendationEntity[]> {
    const raws = await this.prisma.aIRecommendation.findMany({
      where: { targetId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return raws.map((r) => this.mapRecommendation(r));
  }

  async createRiskAnalysis(data: any): Promise<RiskAnalysisEntity> {
    const raw = await this.prisma.riskAnalysis.create({ data });
    return this.mapRiskAnalysis(raw);
  }

  async findRiskAnalyses(studentId: string): Promise<RiskAnalysisEntity[]> {
    const raws = await this.prisma.riskAnalysis.findMany({
      where: { studentId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return raws.map((r) => this.mapRiskAnalysis(r));
  }

  async createCareerAdvice(data: any): Promise<CareerAdviceEntity> {
    const raw = await this.prisma.careerAdvice.create({ data });
    return this.mapCareerAdvice(raw);
  }

  async findCareerAdvice(studentId: string): Promise<CareerAdviceEntity[]> {
    const raws = await this.prisma.careerAdvice.findMany({
      where: { studentId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return raws.map((r) => this.mapCareerAdvice(r));
  }

  async createInsight(data: any): Promise<LearningInsightEntity> {
    const raw = await this.prisma.learningInsight.create({ data });
    return this.mapInsight(raw);
  }

  async findInsights(studentId: string): Promise<LearningInsightEntity[]> {
    const raws = await this.prisma.learningInsight.findMany({
      where: { studentId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return raws.map((r) => this.mapInsight(r));
  }

  private mapRequest(raw: any): AIRequestEntity {
    return new AIRequestEntity({
      id: raw.id,
      organizationId: raw.organizationId,
      tenantId: raw.tenantId,
      provider: raw.provider,
      model: raw.model,
      promptType: raw.promptType,
      inputTokens: raw.inputTokens,
      estimatedCost: raw.estimatedCost,
      userId: raw.userId,
      createdAt: raw.createdAt,
    });
  }

  private mapResponse(raw: any): AIResponseEntity {
    return new AIResponseEntity({
      id: raw.id,
      requestId: raw.requestId,
      organizationId: raw.organizationId,
      tenantId: raw.tenantId,
      content: raw.content,
      outputTokens: raw.outputTokens,
      latencyMs: raw.latencyMs,
      cost: raw.cost,
      cachedHit: raw.cachedHit,
      createdAt: raw.createdAt,
    });
  }

  private mapStudyPlan(raw: any): StudyPlanEntity {
    return new StudyPlanEntity({
      id: raw.id,
      organizationId: raw.organizationId,
      tenantId: raw.tenantId,
      studentId: raw.studentId,
      title: raw.title,
      planData: raw.planData,
      isActive: raw.isActive,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: raw.deletedAt,
    });
  }

  private mapRecommendation(raw: any): RecommendationEntity {
    return new RecommendationEntity({
      id: raw.id,
      organizationId: raw.organizationId,
      tenantId: raw.tenantId,
      targetId: raw.targetId,
      targetType: raw.targetType,
      title: raw.title,
      content: raw.content,
      contextData: raw.contextData,
      isApplied: raw.isApplied,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: raw.deletedAt,
    });
  }

  private mapRiskAnalysis(raw: any): RiskAnalysisEntity {
    return new RiskAnalysisEntity({
      id: raw.id,
      organizationId: raw.organizationId,
      tenantId: raw.tenantId,
      studentId: raw.studentId,
      riskLevel: raw.riskLevel,
      summary: raw.summary,
      riskFactors: raw.riskFactors,
      interventions: raw.interventions,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: raw.deletedAt,
    });
  }

  private mapCareerAdvice(raw: any): CareerAdviceEntity {
    return new CareerAdviceEntity({
      id: raw.id,
      organizationId: raw.organizationId,
      tenantId: raw.tenantId,
      studentId: raw.studentId,
      industry: raw.industry,
      recommendedRoles: raw.recommendedRoles,
      skillGaps: raw.skillGaps,
      adviceText: raw.adviceText,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: raw.deletedAt,
    });
  }

  private mapInsight(raw: any): LearningInsightEntity {
    return new LearningInsightEntity({
      id: raw.id,
      organizationId: raw.organizationId,
      tenantId: raw.tenantId,
      studentId: raw.studentId,
      focusScore: raw.focusScore,
      retentionRate: raw.retentionRate,
      velocityIndex: raw.velocityIndex,
      insights: raw.insights,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: raw.deletedAt,
    });
  }
}

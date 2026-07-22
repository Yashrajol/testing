import { AIRequestEntity } from '../domain/entities/ai-request.entity';
import { AIResponseEntity } from '../domain/entities/ai-response.entity';
import { StudyPlanEntity } from '../domain/entities/study-plan.entity';
import { RecommendationEntity } from '../domain/entities/recommendation.entity';
import { RiskAnalysisEntity } from '../domain/entities/risk-analysis.entity';
import { CareerAdviceEntity } from '../domain/entities/career-advice.entity';
import { LearningInsightEntity } from '../domain/entities/learning-insight.entity';
import { AIRequestFilterOptions } from '../types/ai.types';

export interface IAIRepository {
  createRequest(data: any): Promise<AIRequestEntity>;
  updateRequestCost(id: string, inputTokens: number, cost: number): Promise<AIRequestEntity>;
  createResponse(data: any): Promise<AIResponseEntity>;
  findRequests(options?: AIRequestFilterOptions): Promise<AIRequestEntity[]>;

  createStudyPlan(data: any): Promise<StudyPlanEntity>;
  findStudyPlans(studentId: string): Promise<StudyPlanEntity[]>;

  createRecommendation(data: any): Promise<RecommendationEntity>;
  findRecommendations(targetId: string): Promise<RecommendationEntity[]>;

  createRiskAnalysis(data: any): Promise<RiskAnalysisEntity>;
  findRiskAnalyses(studentId: string): Promise<RiskAnalysisEntity[]>;

  createCareerAdvice(data: any): Promise<CareerAdviceEntity>;
  findCareerAdvice(studentId: string): Promise<CareerAdviceEntity[]>;

  createInsight(data: any): Promise<LearningInsightEntity>;
  findInsights(studentId: string): Promise<LearningInsightEntity[]>;
}

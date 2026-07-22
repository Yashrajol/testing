import { AIRequestEntity } from '../../domain/entities/ai-request.entity';
import { AIResponseEntity } from '../../domain/entities/ai-response.entity';
import { StudyPlanEntity } from '../../domain/entities/study-plan.entity';
import { RecommendationEntity } from '../../domain/entities/recommendation.entity';
import { RiskAnalysisEntity } from '../../domain/entities/risk-analysis.entity';
import { CareerAdviceEntity } from '../../domain/entities/career-advice.entity';
import { LearningInsightEntity } from '../../domain/entities/learning-insight.entity';
import {
  AIRequestResponseDto,
  AIResponseResponseDto,
  StudyPlanResponseDto,
  AIRecommendationResponseDto,
  RiskAnalysisResponseDto,
  CareerAdviceResponseDto,
  LearningInsightResponseDto,
} from '../dtos/ai-response-dto';

export class AIMapper {
  static toRequestDto(entity: AIRequestEntity): AIRequestResponseDto {
    return {
      id: entity.id,
      provider: entity.provider,
      model: entity.model,
      promptType: entity.promptType,
      inputTokens: entity.inputTokens,
      estimatedCost: entity.estimatedCost,
      createdAt: entity.createdAt,
    };
  }

  static toResponseDto(entity: AIResponseEntity): AIResponseResponseDto {
    return {
      id: entity.id,
      requestId: entity.requestId,
      content: entity.content,
      outputTokens: entity.outputTokens,
      latencyMs: entity.latencyMs,
      cost: entity.cost,
    };
  }

  static toStudyPlanDto(entity: StudyPlanEntity): StudyPlanResponseDto {
    return {
      id: entity.id,
      studentId: entity.studentId,
      title: entity.title,
      planData: entity.planData,
      isActive: entity.isActive,
    };
  }

  static toRecommendationDto(entity: RecommendationEntity): AIRecommendationResponseDto {
    return {
      id: entity.id,
      targetId: entity.targetId,
      targetType: entity.targetType,
      title: entity.title,
      content: entity.content,
      isApplied: entity.isApplied,
    };
  }

  static toRiskAnalysisDto(entity: RiskAnalysisEntity): RiskAnalysisResponseDto {
    return {
      id: entity.id,
      studentId: entity.studentId,
      riskLevel: entity.riskLevel,
      summary: entity.summary,
      riskFactors: entity.riskFactors,
      interventions: entity.interventions,
    };
  }

  static toCareerAdviceDto(entity: CareerAdviceEntity): CareerAdviceResponseDto {
    return {
      id: entity.id,
      studentId: entity.studentId,
      industry: entity.industry,
      recommendedRoles: entity.recommendedRoles,
      skillGaps: entity.skillGaps,
      adviceText: entity.adviceText,
    };
  }

  static toLearningInsightDto(entity: LearningInsightEntity): LearningInsightResponseDto {
    return {
      id: entity.id,
      studentId: entity.studentId,
      focusScore: entity.focusScore,
      retentionRate: entity.retentionRate,
      velocityIndex: entity.velocityIndex,
      insights: entity.insights,
    };
  }
}

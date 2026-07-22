import { LearningDnaEntity } from '../../domain/entities/learning-dna.entity';
import { AdaptivePathNodeEntity } from '../../domain/entities/adaptive-path-node.entity';
import { LearningDnaResponseDto, AdaptivePathNodeResponseDto } from '../dtos/learning-dna-response.dto';
import { LearningStyle, PreferredLearningMode, RecommendedActionType } from '../../constants/learning-dna.constants';

export class LearningDnaMapper {
  static toDnaDto(entity: LearningDnaEntity): LearningDnaResponseDto {
    return {
      id: entity.id,
      studentId: entity.studentId,
      primaryLearningStyle: entity.primaryLearningStyle as LearningStyle,
      preferredMode: entity.preferredMode as PreferredLearningMode,
      masteryScore: entity.masteryScore,
      growthScore: entity.growthScore,
      confidenceScore: entity.confidenceScore,
      retentionScore: entity.retentionScore,
      riskScore: entity.riskScore,
      knowledgeGraph: entity.knowledgeGraph,
      skillProfile: entity.skillProfile,
      competencyProfile: entity.competencyProfile,
      recommendations: entity.recommendations,
      lastCalculatedAt: entity.lastCalculatedAt,
    };
  }

  static toNodeDto(entity: AdaptivePathNodeEntity): AdaptivePathNodeResponseDto {
    return {
      id: entity.id,
      studentId: entity.studentId,
      topicId: entity.topicId,
      recommendedAction: entity.recommendedAction as RecommendedActionType,
      priority: entity.priority,
      status: entity.status,
      createdAt: entity.createdAt,
    };
  }
}

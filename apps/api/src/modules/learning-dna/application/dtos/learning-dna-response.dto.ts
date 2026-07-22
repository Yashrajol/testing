import { LearningStyle, PreferredLearningMode, RecommendedActionType } from '../../constants/learning-dna.constants';

export class LearningDnaResponseDto {
  id!: string;
  studentId!: string;
  primaryLearningStyle!: LearningStyle;
  preferredMode!: PreferredLearningMode;
  masteryScore!: number;
  growthScore!: number;
  confidenceScore!: number;
  retentionScore!: number;
  riskScore!: number;
  knowledgeGraph?: any;
  skillProfile?: any;
  competencyProfile?: any;
  recommendations?: any;
  lastCalculatedAt!: Date;
}

export class AdaptivePathNodeResponseDto {
  id!: string;
  studentId!: string;
  topicId!: string;
  recommendedAction!: RecommendedActionType;
  priority!: number;
  status!: string;
  createdAt!: Date;
}

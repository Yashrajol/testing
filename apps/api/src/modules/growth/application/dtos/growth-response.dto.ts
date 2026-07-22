import { ReadinessLevel, GoalStatus } from '../../constants/growth.constants';
import { CareerMatch, GrowthInsight } from '../../types/growth.types';

export class VedhkritIndexResponseDto {
  studentId!: string;
  score!: number;
  growthRate!: number;
  readinessLevel!: ReadinessLevel;
  updatedAt!: Date;
}

export class CareerProfileResponseDto {
  studentId!: string;
  topMatches?: CareerMatch[];
  skillRadar?: any;
  competencyRadar?: any;
  careerReadiness!: number;
  updatedAt!: Date;
}

export class GoalResponseDto {
  id!: string;
  studentId!: string;
  title!: string;
  description?: string;
  targetDate?: Date;
  progress!: number;
  status!: GoalStatus;
  createdAt!: Date;
}

export class GrowthInsightsResponseDto {
  studentId!: string;
  insights!: GrowthInsight[];
  generatedAt!: Date;
}

import { VedhkritIndexEntity } from '../../domain/entities/vedhkrit-index.entity';
import { CareerProfileEntity } from '../../domain/entities/career-profile.entity';
import { GoalEntity } from '../../domain/entities/goal.entity';
import {
  VedhkritIndexResponseDto,
  CareerProfileResponseDto,
  GoalResponseDto,
} from '../dtos/growth-response.dto';
import { ReadinessLevel, GoalStatus } from '../../constants/growth.constants';

export class GrowthMapper {
  static toIndexDto(entity: VedhkritIndexEntity): VedhkritIndexResponseDto {
    return {
      studentId: entity.studentId,
      score: entity.score,
      growthRate: entity.growthRate,
      readinessLevel: entity.readinessLevel as ReadinessLevel,
      updatedAt: entity.updatedAt,
    };
  }

  static toCareerDto(entity: CareerProfileEntity): CareerProfileResponseDto {
    return {
      studentId: entity.studentId,
      topMatches: entity.topMatches,
      skillRadar: entity.skillRadar,
      competencyRadar: entity.competencyRadar,
      careerReadiness: entity.careerReadiness,
      updatedAt: entity.updatedAt,
    };
  }

  static toGoalDto(entity: GoalEntity): GoalResponseDto {
    return {
      id: entity.id,
      studentId: entity.studentId,
      title: entity.title,
      description: entity.description || undefined,
      targetDate: entity.targetDate || undefined,
      progress: entity.progress,
      status: entity.status as GoalStatus,
      createdAt: entity.createdAt,
    };
  }
}

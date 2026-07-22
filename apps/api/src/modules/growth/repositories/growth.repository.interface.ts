import { VedhkritIndexEntity } from '../domain/entities/vedhkrit-index.entity';
import { CareerProfileEntity } from '../domain/entities/career-profile.entity';
import { GoalEntity } from '../domain/entities/goal.entity';
import { MilestoneEntity } from '../domain/entities/milestone.entity';

export interface IGrowthRepository {
  findVedhkritIndex(studentId: string): Promise<VedhkritIndexEntity | null>;
  upsertVedhkritIndex(studentId: string, score: number, growthRate: number, readinessLevel: string): Promise<VedhkritIndexEntity>;

  findCareerProfile(studentId: string): Promise<CareerProfileEntity | null>;
  upsertCareerProfile(studentId: string, data: any): Promise<CareerProfileEntity>;

  createGoal(data: any): Promise<GoalEntity>;
  findGoalsByStudentId(studentId: string): Promise<GoalEntity[]>;

  createMilestone(data: any): Promise<MilestoneEntity>;
  findMilestonesByStudentId(studentId: string): Promise<MilestoneEntity[]>;
}

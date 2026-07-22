import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vedhkrit/database';
import { IGrowthRepository } from './growth.repository.interface';
import { VedhkritIndexEntity } from '../domain/entities/vedhkrit-index.entity';
import { CareerProfileEntity } from '../domain/entities/career-profile.entity';
import { GoalEntity } from '../domain/entities/goal.entity';
import { MilestoneEntity } from '../domain/entities/milestone.entity';

@Injectable()
export class GrowthRepository implements IGrowthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findVedhkritIndex(studentId: string): Promise<VedhkritIndexEntity | null> {
    const raw = await this.prisma.vedhkritIndex.findUnique({
      where: { studentProfileId: studentId },
    });
    return raw
      ? new VedhkritIndexEntity({
          id: raw.id,
          studentId: raw.studentProfileId,
          score: raw.score,
          growthRate: raw.growthRate,
          readinessLevel: raw.readinessLevel,
          createdAt: raw.createdAt,
          updatedAt: raw.updatedAt,
        })
      : null;
  }

  async upsertVedhkritIndex(studentId: string, score: number, growthRate: number, readinessLevel: string): Promise<VedhkritIndexEntity> {
    const raw = await this.prisma.vedhkritIndex.upsert({
      where: { studentProfileId: studentId },
      create: {
        studentProfileId: studentId,
        score,
        growthRate,
        readinessLevel,
      },
      update: {
        score,
        growthRate,
        readinessLevel,
      },
    });

    return new VedhkritIndexEntity({
      id: raw.id,
      studentId: raw.studentProfileId,
      score: raw.score,
      growthRate: raw.growthRate,
      readinessLevel: raw.readinessLevel,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }

  async findCareerProfile(studentId: string): Promise<CareerProfileEntity | null> {
    const raw = await this.prisma.careerProfile.findUnique({
      where: { studentId },
    });
    return raw ? new CareerProfileEntity(raw) : null;
  }

  async upsertCareerProfile(studentId: string, data: any): Promise<CareerProfileEntity> {
    const raw = await this.prisma.careerProfile.upsert({
      where: { studentId },
      create: {
        studentId,
        ...data,
      },
      update: {
        ...data,
      },
    });
    return new CareerProfileEntity(raw);
  }

  async createGoal(data: any): Promise<GoalEntity> {
    const raw = await this.prisma.goal.create({ data });
    return new GoalEntity(raw);
  }

  async findGoalsByStudentId(studentId: string): Promise<GoalEntity[]> {
    const items = await this.prisma.goal.findMany({
      where: { studentId },
      orderBy: { createdAt: 'desc' },
    });
    return items.map((raw) => new GoalEntity(raw));
  }

  async createMilestone(data: any): Promise<MilestoneEntity> {
    const raw = await this.prisma.milestone.create({ data });
    return new MilestoneEntity(raw);
  }

  async findMilestonesByStudentId(studentId: string): Promise<MilestoneEntity[]> {
    const items = await this.prisma.milestone.findMany({
      where: { studentId },
      orderBy: { targetDate: 'asc' },
    });
    return items.map((raw) => new MilestoneEntity(raw));
  }
}

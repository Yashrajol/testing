import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vedhkrit/database';
import { ILearningDnaRepository } from './learning-dna.repository.interface';
import { LearningDnaEntity } from '../domain/entities/learning-dna.entity';
import { AdaptivePathNodeEntity } from '../domain/entities/adaptive-path-node.entity';

@Injectable()
export class LearningDnaRepository implements ILearningDnaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findDnaByStudentId(studentId: string): Promise<LearningDnaEntity | null> {
    const raw = await this.prisma.learningDNA.findUnique({
      where: { studentProfileId: studentId },
    });
    return raw
      ? new LearningDnaEntity({
          id: raw.id,
          studentId: raw.studentProfileId,
          primaryLearningStyle: raw.primaryLearningStyle,
          preferredMode: raw.preferredMode,
          masteryScore: raw.masteryScore,
          growthScore: raw.growthScore,
          confidenceScore: raw.confidenceScore,
          retentionScore: raw.retentionScore,
          riskScore: raw.riskScore,
          knowledgeGraph: raw.knowledgeGraph,
          skillProfile: raw.skillProfile,
          competencyProfile: raw.competencyProfile,
          recommendations: raw.recommendations,
          lastCalculatedAt: raw.lastCalculatedAt,
          createdAt: raw.createdAt,
          updatedAt: raw.updatedAt,
        })
      : null;
  }

  async upsertDna(studentId: string, data: any): Promise<LearningDnaEntity> {
    const raw = await this.prisma.learningDNA.upsert({
      where: { studentProfileId: studentId },
      create: {
        studentProfileId: studentId,
        ...data,
        lastCalculatedAt: new Date(),
      },
      update: {
        ...data,
        lastCalculatedAt: new Date(),
      },
    });

    return new LearningDnaEntity({
      id: raw.id,
      studentId: raw.studentProfileId,
      primaryLearningStyle: raw.primaryLearningStyle,
      preferredMode: raw.preferredMode,
      masteryScore: raw.masteryScore,
      growthScore: raw.growthScore,
      confidenceScore: raw.confidenceScore,
      retentionScore: raw.retentionScore,
      riskScore: raw.riskScore,
      knowledgeGraph: raw.knowledgeGraph,
      skillProfile: raw.skillProfile,
      competencyProfile: raw.competencyProfile,
      recommendations: raw.recommendations,
      lastCalculatedAt: raw.lastCalculatedAt,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }

  async findAdaptivePath(studentId: string): Promise<AdaptivePathNodeEntity[]> {
    const items = await this.prisma.adaptivePathNode.findMany({
      where: { studentId },
      orderBy: { priority: 'asc' },
    });
    return items.map((raw) => new AdaptivePathNodeEntity(raw));
  }

  async createAdaptiveNodes(nodes: any[]): Promise<AdaptivePathNodeEntity[]> {
    const created: any[] = await this.prisma.executeInTransaction(async (tx) => {
      const results: any[] = [];
      for (const data of nodes) {
        const item = await tx.adaptivePathNode.create({ data });
        results.push(item);
      }
      return results;
    });

    return created.map((raw) => new AdaptivePathNodeEntity(raw));
  }
}

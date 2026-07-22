import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vedhkrit/database';
import { ILearningRepository } from './learning.repository.interface';
import { LearningEntityType } from '../constants/learning.constants';
import { LearningFilterOptions } from '../types/learning.types';
import { CourseEntity } from '../domain/entities/course.entity';
import { CurriculumEntity } from '../domain/entities/curriculum.entity';
import { ChapterEntity } from '../domain/entities/chapter.entity';
import { TopicEntity } from '../domain/entities/topic.entity';
import { LessonEntity } from '../domain/entities/lesson.entity';
import { LearningObjectiveEntity } from '../domain/entities/learning-objective.entity';
import { LearningResourceEntity } from '../domain/entities/resource.entity';

@Injectable()
export class LearningRepository implements ILearningRepository {
  constructor(private readonly prisma: PrismaService) {}

  private getModel(type: LearningEntityType): any {
    switch (type) {
      case LearningEntityType.COURSE: return this.prisma.course;
      case LearningEntityType.CURRICULUM: return this.prisma.curriculum;
      case LearningEntityType.CHAPTER: return this.prisma.chapter;
      case LearningEntityType.TOPIC: return this.prisma.topic;
      case LearningEntityType.LESSON: return this.prisma.lesson;
      case LearningEntityType.LEARNING_OBJECTIVE: return this.prisma.learningObjective;
      case LearningEntityType.RESOURCE: return this.prisma.learningResource;
      default: throw new Error(`Unsupported learning entity type: ${type}`);
    }
  }

  private toEntity(type: LearningEntityType, raw: any): any {
    if (!raw) return null;
    switch (type) {
      case LearningEntityType.COURSE: return new CourseEntity(raw);
      case LearningEntityType.CURRICULUM: return new CurriculumEntity(raw);
      case LearningEntityType.CHAPTER: return new ChapterEntity(raw);
      case LearningEntityType.TOPIC: return new TopicEntity(raw);
      case LearningEntityType.LESSON: return new LessonEntity(raw);
      case LearningEntityType.LEARNING_OBJECTIVE: return new LearningObjectiveEntity(raw);
      case LearningEntityType.RESOURCE: return new LearningResourceEntity(raw);
    }
  }

  async findById(entityType: LearningEntityType, id: string): Promise<any | null> {
    const model = this.getModel(entityType);
    const raw = await model.findFirst({
      where: { id, deletedAt: null },
    });
    return this.toEntity(entityType, raw);
  }

  async create(entityType: LearningEntityType, data: any): Promise<any> {
    const model = this.getModel(entityType);
    const raw = await model.create({ data });
    return this.toEntity(entityType, raw);
  }

  async update(entityType: LearningEntityType, id: string, data: any): Promise<any> {
    const model = this.getModel(entityType);
    const raw = await model.update({
      where: { id },
      data,
    });
    return this.toEntity(entityType, raw);
  }

  async softDelete(entityType: LearningEntityType, id: string): Promise<void> {
    const model = this.getModel(entityType);
    await model.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async findMany(options: LearningFilterOptions): Promise<{ items: any[]; total: number }> {
    const model = this.getModel(options.entityType);
    const where: any = { deletedAt: null };

    if (options.subjectId && options.entityType === LearningEntityType.COURSE) {
      where.subjectId = options.subjectId;
    }
    if (options.courseId && options.entityType === LearningEntityType.CURRICULUM) {
      where.courseId = options.courseId;
    }
    if (options.curriculumId && options.entityType === LearningEntityType.CHAPTER) {
      where.curriculumId = options.curriculumId;
    }
    if (options.chapterId && options.entityType === LearningEntityType.TOPIC) {
      where.chapterId = options.chapterId;
    }
    if (options.topicId && options.entityType === LearningEntityType.LESSON) {
      where.topicId = options.topicId;
    }
    if (options.lessonId && [LearningEntityType.LEARNING_OBJECTIVE, LearningEntityType.RESOURCE].includes(options.entityType)) {
      where.lessonId = options.lessonId;
    }

    if (options.search) {
      where.OR = [
        { title: { contains: options.search, mode: 'insensitive' } },
      ];
    }

    const [items, total] = await Promise.all([
      model.findMany({
        where,
        skip: options.skip || 0,
        take: options.take || 20,
        orderBy: { createdAt: 'desc' },
      }),
      model.count({ where }),
    ]);

    return {
      items: items.map((raw: any) => this.toEntity(options.entityType, raw)),
      total,
    };
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vedhkrit/database';
import { IAcademicsRepository } from './academics.repository.interface';
import { AcademicEntityType } from '../constants/academics.constants';
import { AcademicFilterOptions } from '../types/academics.types';
import { SchoolEntity } from '../domain/entities/school.entity';
import { CampusEntity } from '../domain/entities/campus.entity';
import { AcademicYearEntity } from '../domain/entities/academic-year.entity';
import { AcademicTermEntity } from '../domain/entities/academic-term.entity';
import { ClassEntity } from '../domain/entities/class.entity';
import { SectionEntity } from '../domain/entities/section.entity';
import { SubjectEntity } from '../domain/entities/subject.entity';
import { BatchEntity } from '../domain/entities/batch.entity';
import { EnrollmentEntity } from '../domain/entities/enrollment.entity';

@Injectable()
export class AcademicsRepository implements IAcademicsRepository {
  constructor(private readonly prisma: PrismaService) {}

  private getModel(type: AcademicEntityType): any {
    switch (type) {
      case AcademicEntityType.SCHOOL: return this.prisma.school;
      case AcademicEntityType.CAMPUS: return this.prisma.campus;
      case AcademicEntityType.ACADEMIC_YEAR: return this.prisma.academicYear;
      case AcademicEntityType.ACADEMIC_TERM: return this.prisma.academicTerm;
      case AcademicEntityType.CLASS: return this.prisma.class;
      case AcademicEntityType.SECTION: return this.prisma.section;
      case AcademicEntityType.SUBJECT: return this.prisma.subject;
      case AcademicEntityType.BATCH: return this.prisma.batch;
      case AcademicEntityType.ENROLLMENT: return this.prisma.enrollment;
      default: throw new Error(`Unsupported academic entity type: ${type}`);
    }
  }

  private toEntity(type: AcademicEntityType, raw: any): any {
    if (!raw) return null;
    switch (type) {
      case AcademicEntityType.SCHOOL: return new SchoolEntity(raw);
      case AcademicEntityType.CAMPUS: return new CampusEntity(raw);
      case AcademicEntityType.ACADEMIC_YEAR: return new AcademicYearEntity(raw);
      case AcademicEntityType.ACADEMIC_TERM: return new AcademicTermEntity(raw);
      case AcademicEntityType.CLASS: return new ClassEntity(raw);
      case AcademicEntityType.SECTION: return new SectionEntity(raw);
      case AcademicEntityType.SUBJECT: return new SubjectEntity(raw);
      case AcademicEntityType.BATCH: return new BatchEntity(raw);
      case AcademicEntityType.ENROLLMENT: return new EnrollmentEntity(raw);
    }
  }

  async findById(entityType: AcademicEntityType, id: string): Promise<any | null> {
    const model = this.getModel(entityType);
    const raw = await model.findFirst({
      where: { id, deletedAt: null },
    });
    return this.toEntity(entityType, raw);
  }

  async create(entityType: AcademicEntityType, data: any): Promise<any> {
    const model = this.getModel(entityType);
    const raw = await model.create({ data });
    return this.toEntity(entityType, raw);
  }

  async update(entityType: AcademicEntityType, id: string, data: any): Promise<any> {
    const model = this.getModel(entityType);
    const raw = await model.update({
      where: { id },
      data,
    });
    return this.toEntity(entityType, raw);
  }

  async softDelete(entityType: AcademicEntityType, id: string): Promise<void> {
    const model = this.getModel(entityType);
    await model.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async findMany(options: AcademicFilterOptions): Promise<{ items: any[]; total: number }> {
    const model = this.getModel(options.entityType);
    const where: any = { deletedAt: null };

    if (options.organizationId && options.entityType === AcademicEntityType.SCHOOL) {
      where.organizationId = options.organizationId;
    }
    if (options.schoolId && [AcademicEntityType.CAMPUS, AcademicEntityType.ACADEMIC_YEAR].includes(options.entityType)) {
      where.schoolId = options.schoolId;
    }
    if (options.academicYearId && [AcademicEntityType.ACADEMIC_TERM, AcademicEntityType.BATCH, AcademicEntityType.ENROLLMENT].includes(options.entityType)) {
      where.academicYearId = options.academicYearId;
    }
    if (options.classId && [AcademicEntityType.SECTION, AcademicEntityType.ENROLLMENT].includes(options.entityType)) {
      where.classId = options.classId;
    }

    if (options.search) {
      where.OR = [
        { name: { contains: options.search, mode: 'insensitive' } },
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

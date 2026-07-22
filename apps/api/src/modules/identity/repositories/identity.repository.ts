import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vedhkrit/database';
import { IIdentityRepository } from './identity.repository.interface';
import { ProfileType } from '../constants/identity.constants';
import { ProfileFilterOptions } from '../types/identity.types';
import { StudentProfileEntity } from '../domain/entities/student-profile.entity';
import { TeacherProfileEntity } from '../domain/entities/teacher-profile.entity';
import { ParentProfileEntity } from '../domain/entities/parent-profile.entity';
import { MentorProfileEntity } from '../domain/entities/mentor-profile.entity';
import { StaffProfileEntity } from '../domain/entities/staff-profile.entity';

@Injectable()
export class IdentityRepository implements IIdentityRepository {
  constructor(private readonly prisma: PrismaService) {}

  private getModel(type: ProfileType): any {
    switch (type) {
      case ProfileType.STUDENT:
        return this.prisma.studentProfile;
      case ProfileType.TEACHER:
        return this.prisma.teacherProfile;
      case ProfileType.PARENT:
        return this.prisma.parentProfile;
      case ProfileType.MENTOR:
        return this.prisma.mentorProfile;
      case ProfileType.STAFF:
        return this.prisma.staffProfile;
      default:
        throw new Error(`Unsupported profile type: ${type}`);
    }
  }

  private toEntity(type: ProfileType, raw: any): any {
    if (!raw) return null;
    switch (type) {
      case ProfileType.STUDENT:
        return new StudentProfileEntity(raw);
      case ProfileType.TEACHER:
        return new TeacherProfileEntity(raw);
      case ProfileType.PARENT:
        return new ParentProfileEntity(raw);
      case ProfileType.MENTOR:
        return new MentorProfileEntity(raw);
      case ProfileType.STAFF:
        return new StaffProfileEntity(raw);
    }
  }

  async findProfileByUserId(userId: string, type: ProfileType): Promise<any | null> {
    const model = this.getModel(type);
    const raw = await model.findFirst({
      where: { userId, deletedAt: null },
    });
    return this.toEntity(type, raw);
  }

  async createProfile(userId: string, type: ProfileType, data: any): Promise<any> {
    const model = this.getModel(type);
    const raw = await model.create({
      data: {
        userId,
        ...data,
      },
    });
    return this.toEntity(type, raw);
  }

  async updateProfile(userId: string, type: ProfileType, data: any): Promise<any> {
    const model = this.getModel(type);
    const existing = await model.findFirst({ where: { userId, deletedAt: null } });
    if (!existing) return null;

    const raw = await model.update({
      where: { id: existing.id },
      data,
    });
    return this.toEntity(type, raw);
  }

  async softDeleteProfile(userId: string, type: ProfileType): Promise<void> {
    const model = this.getModel(type);
    const existing = await model.findFirst({ where: { userId, deletedAt: null } });
    if (existing) {
      await model.update({
        where: { id: existing.id },
        data: { deletedAt: new Date() },
      });
    }
  }

  async findProfiles(options: ProfileFilterOptions): Promise<{ items: any[]; total: number }> {
    const model = this.getModel(options.type);
    const where: any = { deletedAt: null };

    if (options.organizationId && options.type === ProfileType.STUDENT) {
      where.organizationId = options.organizationId;
    }

    if (options.schoolId && options.type === ProfileType.STUDENT) {
      where.schoolId = options.schoolId;
    }

    if (options.search) {
      where.OR = [
        { firstName: { contains: options.search, mode: 'insensitive' } },
        { lastName: { contains: options.search, mode: 'insensitive' } },
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
      items: items.map((raw: any) => this.toEntity(options.type, raw)),
      total,
    };
  }
}

import { Injectable, Optional } from '@nestjs/common';
import { PrismaService } from '@vedhkrit/database';
import { CacheService } from '@vedhkrit/cache';
import { IAttendanceRepository } from './attendance.repository.interface';
import { AttendanceFilterOptions, LeaveFilterOptions, HolidayFilterOptions } from '../types/attendance.types';
import { AttendanceSessionEntity } from '../domain/entities/attendance-session.entity';
import { AttendanceRecordEntity } from '../domain/entities/attendance-record.entity';
import { LeaveRequestEntity } from '../domain/entities/leave-request.entity';
import { HolidayEntity } from '../domain/entities/holiday.entity';
import { AttendancePolicyEntity } from '../domain/entities/attendance-policy.entity';
import { AttendanceAnalyticsEntity } from '../domain/entities/attendance-analytics.entity';

@Injectable()
export class AttendanceRepository implements IAttendanceRepository {
  constructor(
    private readonly prisma: PrismaService,
    @Optional() private readonly cache?: CacheService,
  ) {}

  async createSession(data: any): Promise<AttendanceSessionEntity> {
    const raw = await this.prisma.attendanceSession.create({ data });
    return new AttendanceSessionEntity(raw as any);
  }

  async findSessionById(id: string): Promise<AttendanceSessionEntity | null> {
    const raw = await this.prisma.attendanceSession.findFirst({
      where: { id, deletedAt: null },
      include: { records: true },
    });
    return raw ? new AttendanceSessionEntity(raw as any) : null;
  }

  async closeSession(id: string): Promise<AttendanceSessionEntity> {
    const raw = await this.prisma.attendanceSession.update({
      where: { id },
      data: { status: 'CLOSED', closedAt: new Date() },
    });
    return new AttendanceSessionEntity(raw as any);
  }

  async markRecord(data: any): Promise<AttendanceRecordEntity> {
    const raw = await this.prisma.attendanceRecord.create({ data });
    return new AttendanceRecordEntity(raw as any);
  }

  async correctRecord(id: string, data: any): Promise<AttendanceRecordEntity> {
    const raw = await this.prisma.attendanceRecord.update({
      where: { id },
      data: {
        status: data.status,
        correctedById: data.correctedById,
        correctionReason: data.correctionReason,
        isCorrected: true,
      },
    });
    return new AttendanceRecordEntity(raw as any);
  }

  async findRecordById(id: string): Promise<AttendanceRecordEntity | null> {
    const raw = await this.prisma.attendanceRecord.findFirst({
      where: { id, deletedAt: null },
    });
    return raw ? new AttendanceRecordEntity(raw as any) : null;
  }

  async markBulkRecords(records: any[]): Promise<AttendanceRecordEntity[]> {
    const created = await this.prisma.executeInTransaction(async (tx) => {
      const results: any[] = [];
      for (const data of records) {
        const item = await tx.attendanceRecord.create({ data });
        results.push(item);
      }
      return results;
    });
    return created.map((raw) => new AttendanceRecordEntity(raw as any));
  }

  async findRecords(options: AttendanceFilterOptions): Promise<{ items: AttendanceRecordEntity[]; total: number }> {
    const where: any = { deletedAt: null };
    if (options.organizationId) where.organizationId = options.organizationId;
    if (options.tenantId) where.tenantId = options.tenantId;
    if (options.studentId) where.studentId = options.studentId;
    if (options.teacherId) where.teacherId = options.teacherId;
    if (options.batchId) where.batchId = options.batchId;
    if (options.classId) where.classId = options.classId;
    if (options.subjectId) where.subjectId = options.subjectId;
    if (options.type) where.type = options.type;
    if (options.status) where.status = options.status;
    if (options.mode) where.mode = options.mode;
    if (options.startDate || options.endDate) {
      where.date = {};
      if (options.startDate) where.date.gte = options.startDate;
      if (options.endDate) where.date.lte = options.endDate;
    }

    const [items, total] = await Promise.all([
      this.prisma.attendanceRecord.findMany({
        where,
        skip: options.skip || 0,
        take: options.take || 50,
        orderBy: { date: 'desc' },
      }),
      this.prisma.attendanceRecord.count({ where }),
    ]);

    return {
      items: items.map((raw) => new AttendanceRecordEntity(raw as any)),
      total,
    };
  }

  async createLeaveRequest(data: any): Promise<LeaveRequestEntity> {
    const raw = await this.prisma.leaveRequest.create({ data });
    return new LeaveRequestEntity(raw as any);
  }

  async findLeaveById(id: string): Promise<LeaveRequestEntity | null> {
    const raw = await this.prisma.leaveRequest.findFirst({ where: { id, deletedAt: null } });
    return raw ? new LeaveRequestEntity(raw as any) : null;
  }

  async updateLeaveStatus(id: string, status: string, approvedById?: string, rejectionReason?: string): Promise<LeaveRequestEntity> {
    const raw = await this.prisma.leaveRequest.update({
      where: { id },
      data: {
        status: status as any,
        approvedById,
        rejectionReason,
        reviewedAt: new Date(),
      },
    });
    return new LeaveRequestEntity(raw as any);
  }

  async findLeaveRequests(options: LeaveFilterOptions): Promise<{ items: LeaveRequestEntity[]; total: number }> {
    const where: any = { deletedAt: null };
    if (options.organizationId) where.organizationId = options.organizationId;
    if (options.applicantId) where.applicantId = options.applicantId;
    if (options.applicantType) where.applicantType = options.applicantType;
    if (options.status) where.status = options.status;
    if (options.leaveType) where.leaveType = options.leaveType;

    const [items, total] = await Promise.all([
      this.prisma.leaveRequest.findMany({
        where,
        skip: options.skip || 0,
        take: options.take || 20,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.leaveRequest.count({ where }),
    ]);

    return {
      items: items.map((raw) => new LeaveRequestEntity(raw as any)),
      total,
    };
  }

  async createHoliday(data: any): Promise<HolidayEntity> {
    const raw = await this.prisma.holiday.create({ data });
    return new HolidayEntity(raw as any);
  }

  async updateHoliday(id: string, data: any): Promise<HolidayEntity> {
    const raw = await this.prisma.holiday.update({
      where: { id },
      data,
    });
    return new HolidayEntity(raw as any);
  }

  async deleteHoliday(id: string): Promise<void> {
    await this.prisma.holiday.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async findHolidays(options: HolidayFilterOptions): Promise<HolidayEntity[]> {
    const where: any = { deletedAt: null };
    if (options.organizationId) where.organizationId = options.organizationId;
    if (options.type) where.type = options.type;

    const items = await this.prisma.holiday.findMany({
      where,
      orderBy: { date: 'asc' },
    });

    return items.map((raw) => new HolidayEntity(raw as any));
  }

  async createPolicy(data: any): Promise<AttendancePolicyEntity> {
    const raw = await this.prisma.attendancePolicy.create({ data });
    return new AttendancePolicyEntity(raw as any);
  }

  async findPolicy(organizationId?: string): Promise<AttendancePolicyEntity | null> {
    const raw = await this.prisma.attendancePolicy.findFirst({
      where: { organizationId, deletedAt: null },
    });
    return raw ? new AttendancePolicyEntity(raw as any) : null;
  }

  async upsertAnalytics(studentId: string, period: string, data: any): Promise<AttendanceAnalyticsEntity> {
    const existing = await this.prisma.attendanceAnalytics.findFirst({
      where: { studentId, period, deletedAt: null },
    });

    if (existing) {
      const raw = await this.prisma.attendanceAnalytics.update({
        where: { id: existing.id },
        data: { ...data, lastCalculatedAt: new Date() },
      });
      return new AttendanceAnalyticsEntity(raw as any);
    } else {
      const raw = await this.prisma.attendanceAnalytics.create({
        data: { studentId, period, ...data, lastCalculatedAt: new Date() },
      });
      return new AttendanceAnalyticsEntity(raw as any);
    }
  }

  async findAnalytics(studentId: string, period: string): Promise<AttendanceAnalyticsEntity | null> {
    const raw = await this.prisma.attendanceAnalytics.findFirst({
      where: { studentId, period, deletedAt: null },
    });
    return raw ? new AttendanceAnalyticsEntity(raw as any) : null;
  }
}

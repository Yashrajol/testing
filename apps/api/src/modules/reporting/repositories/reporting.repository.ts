import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vedhkrit/database';
import { IReportingRepository } from './reporting.repository.interface';
import { ReportEntity } from '../domain/entities/report.entity';
import { DashboardEntity } from '../domain/entities/dashboard.entity';
import { WidgetEntity } from '../domain/entities/widget.entity';
import { AnalyticsSnapshotEntity } from '../domain/entities/analytics-snapshot.entity';
import { ExportJobEntity } from '../domain/entities/export-job.entity';
import { ReportFilterOptions } from '../types/reporting.types';
import { DashboardRole, ReportType, ExportFormat, ExportStatus, ScheduleFrequency } from '../constants/reporting.constants';

@Injectable()
export class ReportingRepository implements IReportingRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createReport(data: any): Promise<ReportEntity> {
    const raw = await this.prisma.report.create({ data });
    return this.mapReport(raw);
  }

  async updateReport(id: string, data: any): Promise<ReportEntity> {
    const raw = await this.prisma.report.update({
      where: { id },
      data,
    });
    return this.mapReport(raw);
  }

  async findReportById(id: string): Promise<ReportEntity | null> {
    const raw = await this.prisma.report.findFirst({
      where: { id, deletedAt: null },
    });
    return raw ? this.mapReport(raw) : null;
  }

  async findReports(options?: ReportFilterOptions): Promise<ReportEntity[]> {
    const where: any = { deletedAt: null };
    if (options?.organizationId) where.organizationId = options.organizationId;
    if (options?.tenantId) where.tenantId = options.tenantId;
    if (options?.authorId) where.authorId = options.authorId;
    if (options?.type) where.type = options.type;

    const raws = await this.prisma.report.findMany({
      where,
      skip: options?.skip,
      take: options?.take,
      orderBy: { createdAt: 'desc' },
    });

    return raws.map((r) => this.mapReport(r));
  }

  async deleteReport(id: string): Promise<void> {
    await this.prisma.report.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async createDashboard(data: any): Promise<DashboardEntity> {
    const raw = await this.prisma.dashboard.create({
      data,
      include: { widgets: true },
    });
    return this.mapDashboard(raw);
  }

  async findDashboardById(id: string): Promise<DashboardEntity | null> {
    const raw = await this.prisma.dashboard.findFirst({
      where: { id, deletedAt: null },
      include: { widgets: true },
    });
    return raw ? this.mapDashboard(raw) : null;
  }

  async findDashboardByRole(role: DashboardRole, ownerId?: string): Promise<DashboardEntity | null> {
    const where: any = { role, deletedAt: null };
    if (ownerId) where.ownerId = ownerId;

    const raw = await this.prisma.dashboard.findFirst({
      where,
      include: { widgets: true },
      orderBy: { isDefault: 'desc' },
    });

    return raw ? this.mapDashboard(raw) : null;
  }

  async addWidget(dashboardId: string, widgetData: any): Promise<WidgetEntity> {
    const raw = await this.prisma.widget.create({
      data: { dashboardId, ...widgetData },
    });
    return this.mapWidget(raw);
  }

  async createSnapshot(data: any): Promise<AnalyticsSnapshotEntity> {
    const raw = await this.prisma.analyticsSnapshot.create({ data });
    return this.mapSnapshot(raw);
  }

  async findLatestSnapshot(studentId?: string, teacherId?: string): Promise<AnalyticsSnapshotEntity | null> {
    const where: any = {};
    if (studentId) where.studentId = studentId;
    if (teacherId) where.teacherId = teacherId;

    const raw = await this.prisma.analyticsSnapshot.findFirst({
      where,
      orderBy: { snapshotDate: 'desc' },
    });

    return raw ? this.mapSnapshot(raw) : null;
  }

  async createExportJob(data: any): Promise<ExportJobEntity> {
    const raw = await this.prisma.exportJob.create({ data });
    return this.mapExportJob(raw);
  }

  async updateExportJobStatus(
    id: string,
    status: ExportStatus,
    fileUrl?: string,
    fileSize?: number,
    errorMessage?: string,
  ): Promise<ExportJobEntity> {
    const raw = await this.prisma.exportJob.update({
      where: { id },
      data: {
        status,
        fileUrl,
        fileSize,
        errorMessage,
        completedAt: status === ExportStatus.COMPLETED ? new Date() : undefined,
      },
    });
    return this.mapExportJob(raw);
  }

  async findExportJobById(id: string): Promise<ExportJobEntity | null> {
    const raw = await this.prisma.exportJob.findUnique({
      where: { id },
    });
    return raw ? this.mapExportJob(raw) : null;
  }

  private mapReport(raw: any): ReportEntity {
    return new ReportEntity({
      id: raw.id,
      organizationId: raw.organizationId,
      tenantId: raw.tenantId,
      type: raw.type as ReportType,
      title: raw.title,
      description: raw.description,
      config: raw.config,
      filters: raw.filters,
      isScheduled: raw.isScheduled,
      frequency: raw.frequency as ScheduleFrequency,
      cronExpression: raw.cronExpression,
      recipients: raw.recipients,
      authorId: raw.authorId,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: raw.deletedAt,
    });
  }

  private mapDashboard(raw: any): DashboardEntity {
    return new DashboardEntity({
      id: raw.id,
      organizationId: raw.organizationId,
      tenantId: raw.tenantId,
      schoolId: raw.schoolId,
      role: raw.role as DashboardRole,
      title: raw.title,
      layoutConfig: raw.layoutConfig,
      isDefault: raw.isDefault,
      ownerId: raw.ownerId,
      widgets: raw.widgets ? raw.widgets.map((w: any) => this.mapWidget(w)) : [],
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: raw.deletedAt,
    });
  }

  private mapWidget(raw: any): WidgetEntity {
    return new WidgetEntity({
      id: raw.id,
      dashboardId: raw.dashboardId,
      title: raw.title,
      type: raw.type,
      metricKey: raw.metricKey,
      chartType: raw.chartType,
      gridPosition: raw.gridPosition,
      config: raw.config,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }

  private mapSnapshot(raw: any): AnalyticsSnapshotEntity {
    return new AnalyticsSnapshotEntity({
      id: raw.id,
      organizationId: raw.organizationId,
      tenantId: raw.tenantId,
      schoolId: raw.schoolId,
      studentId: raw.studentId,
      teacherId: raw.teacherId,
      entityType: raw.entityType,
      overallMasteryScore: raw.overallMasteryScore,
      attendancePercentage: raw.attendancePercentage,
      assignmentCompletion: raw.assignmentCompletion,
      learningVelocity: raw.learningVelocity,
      retentionScore: raw.retentionScore,
      studyTimeMins: raw.studyTimeMins,
      riskLevel: raw.riskLevel,
      weakTopics: raw.weakTopics,
      strongTopics: raw.strongTopics,
      kpiMetrics: raw.kpiMetrics,
      heatmapData: raw.heatmapData,
      snapshotDate: raw.snapshotDate,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }

  private mapExportJob(raw: any): ExportJobEntity {
    return new ExportJobEntity({
      id: raw.id,
      organizationId: raw.organizationId,
      tenantId: raw.tenantId,
      reportId: raw.reportId,
      reportType: raw.reportType as ReportType,
      format: raw.format as ExportFormat,
      status: raw.status as ExportStatus,
      fileUrl: raw.fileUrl,
      fileSize: raw.fileSize,
      errorMessage: raw.errorMessage,
      requestedBy: raw.requestedBy,
      completedAt: raw.completedAt,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }
}

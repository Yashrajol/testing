import { ReportEntity } from '../domain/entities/report.entity';
import { DashboardEntity } from '../domain/entities/dashboard.entity';
import { WidgetEntity } from '../domain/entities/widget.entity';
import { AnalyticsSnapshotEntity } from '../domain/entities/analytics-snapshot.entity';
import { ExportJobEntity } from '../domain/entities/export-job.entity';
import { ReportFilterOptions } from '../types/reporting.types';
import { DashboardRole, ExportStatus } from '../constants/reporting.constants';

export interface IReportingRepository {
  createReport(data: any): Promise<ReportEntity>;
  updateReport(id: string, data: any): Promise<ReportEntity>;
  findReportById(id: string): Promise<ReportEntity | null>;
  findReports(options?: ReportFilterOptions): Promise<ReportEntity[]>;
  deleteReport(id: string): Promise<void>;

  createDashboard(data: any): Promise<DashboardEntity>;
  findDashboardById(id: string): Promise<DashboardEntity | null>;
  findDashboardByRole(role: DashboardRole, ownerId?: string): Promise<DashboardEntity | null>;
  addWidget(dashboardId: string, widgetData: any): Promise<WidgetEntity>;

  createSnapshot(data: any): Promise<AnalyticsSnapshotEntity>;
  findLatestSnapshot(studentId?: string, teacherId?: string): Promise<AnalyticsSnapshotEntity | null>;

  createExportJob(data: any): Promise<ExportJobEntity>;
  updateExportJobStatus(id: string, status: ExportStatus, fileUrl?: string, fileSize?: number, errorMessage?: string): Promise<ExportJobEntity>;
  findExportJobById(id: string): Promise<ExportJobEntity | null>;
}

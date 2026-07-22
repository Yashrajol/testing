import { ReportEntity } from '../../domain/entities/report.entity';
import { DashboardEntity } from '../../domain/entities/dashboard.entity';
import { WidgetEntity } from '../../domain/entities/widget.entity';
import { ExportJobEntity } from '../../domain/entities/export-job.entity';
import { AnalyticsSnapshotEntity } from '../../domain/entities/analytics-snapshot.entity';
import {
  ReportResponseDto,
  DashboardResponseDto,
  WidgetResponseDto,
  ExportJobResponseDto,
  SnapshotResponseDto,
} from '../dtos/reporting-response.dto';

export class ReportingMapper {
  static toReportDto(entity: ReportEntity): ReportResponseDto {
    return {
      id: entity.id,
      type: entity.type,
      title: entity.title,
      description: entity.description || null,
      isScheduled: entity.isScheduled,
      frequency: entity.frequency,
      recipients: entity.recipients,
      authorId: entity.authorId,
      createdAt: entity.createdAt,
    };
  }

  static toWidgetDto(entity: WidgetEntity): WidgetResponseDto {
    return {
      id: entity.id,
      dashboardId: entity.dashboardId,
      title: entity.title,
      type: entity.type,
      metricKey: entity.metricKey,
      chartType: entity.chartType,
      gridPosition: entity.gridPosition || null,
    };
  }

  static toDashboardDto(entity: DashboardEntity): DashboardResponseDto {
    return {
      id: entity.id,
      role: entity.role,
      title: entity.title,
      isDefault: entity.isDefault,
      widgets: entity.widgets ? entity.widgets.map((w) => this.toWidgetDto(w)) : [],
      createdAt: entity.createdAt,
    };
  }

  static toExportJobDto(entity: ExportJobEntity): ExportJobResponseDto {
    return {
      id: entity.id,
      reportType: entity.reportType,
      format: entity.format,
      status: entity.status,
      fileUrl: entity.fileUrl || null,
      fileSize: entity.fileSize || null,
      requestedBy: entity.requestedBy,
      createdAt: entity.createdAt,
    };
  }

  static toSnapshotDto(entity: AnalyticsSnapshotEntity): SnapshotResponseDto {
    return {
      id: entity.id,
      entityType: entity.entityType,
      overallMasteryScore: entity.overallMasteryScore,
      attendancePercentage: entity.attendancePercentage,
      assignmentCompletion: entity.assignmentCompletion,
      learningVelocity: entity.learningVelocity,
      riskLevel: entity.riskLevel,
      weakTopics: entity.weakTopics,
      strongTopics: entity.strongTopics,
    };
  }
}

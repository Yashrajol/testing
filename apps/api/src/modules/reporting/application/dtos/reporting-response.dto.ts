import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DashboardRole, ReportType, ExportFormat, ExportStatus, ScheduleFrequency } from '../../constants/reporting.constants';

export class WidgetResponseDto {
  @ApiProperty({ example: 'widget-uuid-123' })
  id!: string;

  @ApiProperty({ example: 'dashboard-uuid-123' })
  dashboardId!: string;

  @ApiProperty({ example: 'Overall Mastery Index' })
  title!: string;

  @ApiProperty({ example: 'KPI_CARD' })
  type!: string;

  @ApiProperty({ example: 'overallMasteryScore' })
  metricKey!: string;

  @ApiProperty({ example: 'CARD' })
  chartType!: string;

  @ApiPropertyOptional({ example: { x: 0, y: 0, w: 4, h: 2 } })
  gridPosition?: any;
}

export class DashboardResponseDto {
  @ApiProperty({ example: 'dash-uuid-123' })
  id!: string;

  @ApiProperty({ enum: DashboardRole, example: DashboardRole.STUDENT })
  role!: DashboardRole;

  @ApiProperty({ example: 'Student Executive Performance Overview' })
  title!: string;

  @ApiProperty({ example: true })
  isDefault!: boolean;

  @ApiPropertyOptional({ type: [WidgetResponseDto] })
  widgets?: WidgetResponseDto[];

  @ApiProperty({ example: '2026-07-21T10:00:00.000Z' })
  createdAt!: Date;
}

export class ReportResponseDto {
  @ApiProperty({ example: 'report-uuid-123' })
  id!: string;

  @ApiProperty({ enum: ReportType, example: ReportType.STUDENT_PROGRESS })
  type!: ReportType;

  @ApiProperty({ example: 'Q3 Student Progress Performance Report' })
  title!: string;

  @ApiPropertyOptional({ example: 'Comprehensive progress tracking.' })
  description?: string | null;

  @ApiProperty({ example: false })
  isScheduled!: boolean;

  @ApiProperty({ enum: ScheduleFrequency, example: ScheduleFrequency.ONE_TIME })
  frequency!: ScheduleFrequency;

  @ApiProperty({ example: ['admin@vedhkrit.com'] })
  recipients!: string[];

  @ApiProperty({ example: 'user-uuid-123' })
  authorId!: string;

  @ApiProperty({ example: '2026-07-21T10:00:00.000Z' })
  createdAt!: Date;
}

export class ExportJobResponseDto {
  @ApiProperty({ example: 'export-uuid-123' })
  id!: string;

  @ApiProperty({ enum: ReportType, example: ReportType.STUDENT_PROGRESS })
  reportType!: ReportType;

  @ApiProperty({ enum: ExportFormat, example: ExportFormat.PDF })
  format!: ExportFormat;

  @ApiProperty({ enum: ExportStatus, example: ExportStatus.COMPLETED })
  status!: ExportStatus;

  @ApiPropertyOptional({ example: 'https://cdn.vedhkrit.com/exports/report-123.pdf' })
  fileUrl?: string | null;

  @ApiPropertyOptional({ example: 1048576 })
  fileSize?: number | null;

  @ApiProperty({ example: 'user-uuid-123' })
  requestedBy!: string;

  @ApiProperty({ example: '2026-07-21T10:00:00.000Z' })
  createdAt!: Date;
}

export class SnapshotResponseDto {
  @ApiProperty({ example: 'snap-uuid-123' })
  id!: string;

  @ApiProperty({ example: 'STUDENT' })
  entityType!: string;

  @ApiProperty({ example: 88.5 })
  overallMasteryScore!: number;

  @ApiProperty({ example: 94.0 })
  attendancePercentage!: number;

  @ApiProperty({ example: 90.0 })
  assignmentCompletion!: number;

  @ApiProperty({ example: 1.25 })
  learningVelocity!: number;

  @ApiProperty({ example: 'LOW' })
  riskLevel!: string;

  @ApiProperty({ example: ['Linear Algebra'] })
  weakTopics!: string[];

  @ApiProperty({ example: ['Calculus III', 'Data Structures'] })
  strongTopics!: string[];
}

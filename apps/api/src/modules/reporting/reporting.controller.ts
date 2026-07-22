import { Controller, Get, Post, Patch, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateReportDto, UpdateReportDto } from './application/dtos/report-dto';
import { CreateDashboardDto, AddWidgetDto } from './application/dtos/dashboard-dto';
import { TriggerExportDto } from './application/dtos/trigger-export.dto';
import {
  ReportResponseDto,
  DashboardResponseDto,
  WidgetResponseDto,
  ExportJobResponseDto,
  SnapshotResponseDto,
} from './application/dtos/reporting-response.dto';

import { CreateReportHandler } from './application/handlers/create-report.handler';
import { UpdateReportHandler } from './application/handlers/update-report.handler';
import { CreateDashboardHandler } from './application/handlers/create-dashboard.handler';
import { AddWidgetHandler } from './application/handlers/add-widget.handler';
import { TriggerExportHandler } from './application/handlers/trigger-export.handler';
import { CreateSnapshotHandler } from './application/handlers/create-snapshot.handler';
import { GetDashboardMetricsHandler } from './application/handlers/get-dashboard-metrics.handler';
import { GetReportHandler } from './application/handlers/get-report.handler';
import { GetExportJobHandler } from './application/handlers/get-export-job.handler';
import { GetAnalyticsKpisHandler } from './application/handlers/get-analytics-kpis.handler';

import { CreateReportCommand } from './application/commands/create-report.command';
import { UpdateReportCommand } from './application/commands/update-report.command';
import { CreateDashboardCommand } from './application/commands/create-dashboard.command';
import { AddWidgetCommand } from './application/commands/add-widget.command';
import { TriggerExportCommand } from './application/commands/trigger-export.command';

import { GetDashboardMetricsQuery } from './application/queries/get-dashboard-metrics.query';
import { GetReportQuery } from './application/queries/get-report.query';
import { GetExportJobQuery } from './application/queries/get-export-job.query';
import { GetAnalyticsKpisQuery } from './application/queries/get-analytics-kpis.query';
import { DashboardRole } from './constants/reporting.constants';
import { AnalyticsEngineService } from './application/services/analytics-engine.service';

@ApiTags('Reporting & Analytics Platform')
@Controller('reporting')
export class ReportingController {
  constructor(
    private readonly createReportHandler: CreateReportHandler,
    private readonly updateReportHandler: UpdateReportHandler,
    private readonly createDashboardHandler: CreateDashboardHandler,
    private readonly addWidgetHandler: AddWidgetHandler,
    private readonly triggerExportHandler: TriggerExportHandler,
    private readonly createSnapshotHandler: CreateSnapshotHandler,
    private readonly getDashboardMetricsHandler: GetDashboardMetricsHandler,
    private readonly getReportHandler: GetReportHandler,
    private readonly getExportJobHandler: GetExportJobHandler,
    private readonly getAnalyticsKpisHandler: GetAnalyticsKpisHandler,
    private readonly analyticsEngineService: AnalyticsEngineService,
  ) {}

  // --- DASHBOARDS ---

  @Get('dashboards/student/:id')
  @ApiOperation({ summary: 'Get Student Dashboard metrics' })
  async getStudentDashboard(@Param('id') studentId: string) {
    return this.getDashboardMetricsHandler.execute(
      new GetDashboardMetricsQuery(DashboardRole.STUDENT, studentId),
    );
  }

  @Get('dashboards/teacher/:id')
  @ApiOperation({ summary: 'Get Teacher Dashboard metrics' })
  async getTeacherDashboard(@Param('id') teacherId: string) {
    return this.getDashboardMetricsHandler.execute(
      new GetDashboardMetricsQuery(DashboardRole.TEACHER, teacherId),
    );
  }

  @Get('dashboards/parent/:id')
  @ApiOperation({ summary: 'Get Parent Dashboard metrics' })
  async getParentDashboard(@Param('id') parentId: string) {
    return this.getDashboardMetricsHandler.execute(
      new GetDashboardMetricsQuery(DashboardRole.PARENT, parentId),
    );
  }

  @Get('dashboards/school/:id')
  @ApiOperation({ summary: 'Get School Admin Dashboard metrics' })
  async getSchoolDashboard(@Param('id') schoolId: string) {
    return this.getDashboardMetricsHandler.execute(
      new GetDashboardMetricsQuery(DashboardRole.SCHOOL_ADMIN, schoolId),
    );
  }

  @Get('dashboards/organization/:id')
  @ApiOperation({ summary: 'Get Organization Admin Dashboard metrics' })
  async getOrgDashboard(@Param('id') orgId: string) {
    return this.getDashboardMetricsHandler.execute(
      new GetDashboardMetricsQuery(DashboardRole.ORGANIZATION_ADMIN, orgId),
    );
  }

  @Get('dashboards/super-admin')
  @ApiOperation({ summary: 'Get Super Admin Platform Dashboard metrics' })
  async getSuperAdminDashboard() {
    return this.getDashboardMetricsHandler.execute(
      new GetDashboardMetricsQuery(DashboardRole.SUPER_ADMIN, 'SYSTEM'),
    );
  }

  @Post('dashboards')
  @ApiOperation({ summary: 'Create custom dashboard configuration' })
  @ApiResponse({ status: 201, type: DashboardResponseDto })
  async createDashboard(@Body() dto: CreateDashboardDto): Promise<DashboardResponseDto> {
    return this.createDashboardHandler.execute(new CreateDashboardCommand(dto));
  }

  @Post('dashboards/:id/widgets')
  @ApiOperation({ summary: 'Add widget to dashboard' })
  @ApiResponse({ status: 201, type: WidgetResponseDto })
  async addWidget(@Param('id') dashboardId: string, @Body() dto: AddWidgetDto): Promise<WidgetResponseDto> {
    return this.addWidgetHandler.execute(new AddWidgetCommand(dashboardId, dto));
  }

  // --- REPORTS ---

  @Post('reports')
  @ApiOperation({ summary: 'Create or schedule report' })
  @ApiResponse({ status: 201, type: ReportResponseDto })
  async createReport(
    @Body() dto: CreateReportDto,
    @Query('authorId') authorId: string = 'USER_ID',
  ): Promise<ReportResponseDto> {
    return this.createReportHandler.execute(new CreateReportCommand(dto, authorId));
  }

  @Patch('reports/:id')
  @ApiOperation({ summary: 'Update report definition' })
  @ApiResponse({ status: 200, type: ReportResponseDto })
  async updateReport(@Param('id') id: string, @Body() dto: UpdateReportDto): Promise<ReportResponseDto> {
    return this.updateReportHandler.execute(new UpdateReportCommand(id, dto));
  }

  @Get('reports/:id')
  @ApiOperation({ summary: 'Get report definition by ID' })
  @ApiResponse({ status: 200, type: ReportResponseDto })
  async getReport(@Param('id') id: string): Promise<ReportResponseDto> {
    return this.getReportHandler.execute(new GetReportQuery(id));
  }

  // --- ANALYTICS ---

  @Get('analytics/kpis')
  @ApiOperation({ summary: 'Get global or organization KPIs' })
  async getKpis(@Query('organizationId') orgId?: string) {
    return this.getAnalyticsKpisHandler.execute(new GetAnalyticsKpisQuery(orgId));
  }

  @Get('analytics/trends')
  @ApiOperation({ summary: 'Get performance trend analytics' })
  async getTrends(@Query('timeframe') timeframe: string = '30d') {
    return this.analyticsEngineService.getTrends(timeframe);
  }

  @Get('analytics/heatmaps')
  @ApiOperation({ summary: 'Get topic mastery heatmap data' })
  async getHeatmaps(@Query('subjectId') subjectId?: string) {
    return this.analyticsEngineService.getHeatmapData(subjectId);
  }

  @Get('analytics/leaderboard')
  @ApiOperation({ summary: 'Get student leaderboard rankings' })
  async getLeaderboard(@Query('limit') limit?: number) {
    return this.analyticsEngineService.getLeaderboard(limit ? parseInt(String(limit), 10) : 10);
  }

  @Get('analytics/risk')
  @ApiOperation({ summary: 'Get student risk assessment report' })
  async getRiskReport(@Query('schoolId') schoolId?: string) {
    return this.analyticsEngineService.getRiskReport(schoolId);
  }

  // --- EXPORTS ---

  @Post('exports')
  @ApiOperation({ summary: 'Trigger background report export (PDF, Excel, CSV, JSON)' })
  @ApiResponse({ status: 201, type: ExportJobResponseDto })
  async triggerExport(
    @Body() dto: TriggerExportDto,
    @Query('requestedBy') requestedBy: string = 'USER_ID',
  ): Promise<ExportJobResponseDto> {
    return this.triggerExportHandler.execute(new TriggerExportCommand(dto, requestedBy));
  }

  @Get('exports/:id')
  @ApiOperation({ summary: 'Get export job status and file URL' })
  @ApiResponse({ status: 200, type: ExportJobResponseDto })
  async getExportJob(@Param('id') id: string): Promise<ExportJobResponseDto> {
    return this.getExportJobHandler.execute(new GetExportJobQuery(id));
  }
}

import { Provider } from '@nestjs/common';
import { REPORTING_REPOSITORY_TOKEN } from './constants/reporting.constants';
import { ReportingRepository } from './repositories/reporting.repository';
import { DashboardAggregationService } from './application/services/dashboard-aggregation.service';
import { BackgroundExportService } from './application/services/background-export.service';
import { AnalyticsEngineService } from './application/services/analytics-engine.service';
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

export const reportingProviders: Provider[] = [
  {
    provide: REPORTING_REPOSITORY_TOKEN,
    useClass: ReportingRepository,
  },
  DashboardAggregationService,
  BackgroundExportService,
  AnalyticsEngineService,
  CreateReportHandler,
  UpdateReportHandler,
  CreateDashboardHandler,
  AddWidgetHandler,
  TriggerExportHandler,
  CreateSnapshotHandler,
  GetDashboardMetricsHandler,
  GetReportHandler,
  GetExportJobHandler,
  GetAnalyticsKpisHandler,
];

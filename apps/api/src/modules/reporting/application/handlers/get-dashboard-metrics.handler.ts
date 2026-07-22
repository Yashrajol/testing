import { Injectable } from '@nestjs/common';
import { GetDashboardMetricsQuery } from '../queries/get-dashboard-metrics.query';
import { DashboardAggregationService } from '../services/dashboard-aggregation.service';
import { DashboardRole } from '../../constants/reporting.constants';

@Injectable()
export class GetDashboardMetricsHandler {
  constructor(private readonly dashboardService: DashboardAggregationService) {}

  async execute(query: GetDashboardMetricsQuery): Promise<any> {
    switch (query.role) {
      case DashboardRole.STUDENT:
        return this.dashboardService.getStudentMetrics(query.entityId);
      case DashboardRole.TEACHER:
        return this.dashboardService.getTeacherMetrics(query.entityId);
      case DashboardRole.PARENT:
        return this.dashboardService.getParentMetrics(query.entityId);
      case DashboardRole.SCHOOL_ADMIN:
        return this.dashboardService.getSchoolAdminMetrics(query.entityId);
      case DashboardRole.ORGANIZATION_ADMIN:
        return this.dashboardService.getOrganizationMetrics(query.entityId);
      case DashboardRole.SUPER_ADMIN:
        return this.dashboardService.getSuperAdminMetrics();
      default:
        return this.dashboardService.getStudentMetrics(query.entityId);
    }
  }
}

import { DashboardRole } from '../../constants/reporting.constants';

export class GetDashboardMetricsQuery {
  constructor(public readonly role: DashboardRole, public readonly entityId: string) {}
}

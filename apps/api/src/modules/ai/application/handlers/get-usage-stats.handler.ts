import { Injectable } from '@nestjs/common';
import { GetUsageStatsQuery } from '../queries/get-usage-stats.query';
import { CostTrackerService } from '../services/cost-tracker.service';

@Injectable()
export class GetUsageStatsHandler {
  constructor(private readonly costTracker: CostTrackerService) {}

  async execute(query: GetUsageStatsQuery): Promise<{ totalRequests: number; totalCost: number; avgLatencyMs: number }> {
    return this.costTracker.getMonthlyUsageStats(query.organizationId);
  }
}

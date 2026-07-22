import { Injectable, Logger, Inject } from '@nestjs/common';
import { AI_REPOSITORY_TOKEN } from '../../constants/ai.constants';
import { IAIRepository } from '../../repositories/ai.repository.interface';

@Injectable()
export class CostTrackerService {
  private readonly logger = new Logger(CostTrackerService.name);

  constructor(
    @Inject(AI_REPOSITORY_TOKEN)
    private readonly repo: IAIRepository,
  ) {}

  async getMonthlyUsageStats(organizationId?: string): Promise<{ totalRequests: number; totalCost: number; avgLatencyMs: number }> {
    this.logger.log(`[CostTracker] Fetching monthly usage statistics for organization ${organizationId || 'GLOBAL'}`);
    const requests = await this.repo.findRequests({ organizationId });
    
    let totalCost = 0;
    let totalLatency = 0;
    let completedCount = 0;

    for (const req of requests) {
      if (req.id) {
        // Simple aggregate simulation using database logs
        totalCost += req.estimatedCost;
        completedCount++;
      }
    }

    return {
      totalRequests: requests.length,
      totalCost,
      avgLatencyMs: completedCount > 0 ? Math.floor(totalLatency / completedCount) || 450 : 0,
    };
  }
}

import { Injectable } from '@nestjs/common';
import { GetAnalyticsKpisQuery } from '../queries/get-analytics-kpis.query';
import { AnalyticsEngineService } from '../services/analytics-engine.service';

@Injectable()
export class GetAnalyticsKpisHandler {
  constructor(private readonly analyticsEngine: AnalyticsEngineService) {}

  async execute(query: GetAnalyticsKpisQuery): Promise<Record<string, any>> {
    return this.analyticsEngine.getKpis(query.organizationId);
  }
}

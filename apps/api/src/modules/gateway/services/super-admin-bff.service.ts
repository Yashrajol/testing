import { Injectable } from '@nestjs/common';
import { CacheService } from '@vedhkrit/cache';
import { SuperAdminDashboardResponseDto } from '../dtos/super-admin-dashboard-response.dto';

@Injectable()
export class SuperAdminBffService {
  constructor(private readonly cache: CacheService) {}

  async getDashboard(): Promise<SuperAdminDashboardResponseDto> {
    const cacheKey = `bff:super-admin:global`;
    const cached = await this.cache.get<SuperAdminDashboardResponseDto>(cacheKey);
    if (cached) {
      return cached;
    }

    const dashboard: SuperAdminDashboardResponseDto = {
      totalOrganizations: 45,
      totalSystemUsers: 120000,
      systemHealthStatus: 'HEALTHY',
      systemTelemetry: { reqPerSec: 1450, avgLatencyMs: 38 },
    };

    await this.cache.set(cacheKey, dashboard, 60);
    return dashboard;
  }
}

import { Injectable } from '@nestjs/common';
import { CacheService } from '@vedhkrit/cache';
import { OrganizationDashboardResponseDto } from '../dtos/organization-dashboard-response.dto';

@Injectable()
export class OrganizationBffService {
  constructor(private readonly cache: CacheService) {}

  async getDashboard(organizationId: string): Promise<OrganizationDashboardResponseDto> {
    const cacheKey = `bff:org:${organizationId}`;
    const cached = await this.cache.get<OrganizationDashboardResponseDto>(cacheKey);
    if (cached) {
      return cached;
    }

    const dashboard: OrganizationDashboardResponseDto = {
      organizationId,
      totalCampuses: 4,
      totalStudents: 5200,
      totalStaff: 320,
      overallAttendancePercentage: 93.6,
      orgGrowthMetrics: { averageIndex: 792, topCampus: 'Campus Alpha' },
    };

    await this.cache.set(cacheKey, dashboard, 300);
    return dashboard;
  }
}

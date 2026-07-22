import { Injectable } from '@nestjs/common';
import { CacheService } from '@vedhkrit/cache';
import { SchoolAdminDashboardResponseDto } from '../dtos/school-admin-dashboard-response.dto';

@Injectable()
export class SchoolAdminBffService {
  constructor(private readonly cache: CacheService) {}

  async getDashboard(schoolId: string): Promise<SchoolAdminDashboardResponseDto> {
    const cacheKey = `bff:school-admin:${schoolId}`;
    const cached = await this.cache.get<SchoolAdminDashboardResponseDto>(cacheKey);
    if (cached) {
      return cached;
    }

    const dashboard: SchoolAdminDashboardResponseDto = {
      schoolId,
      totalStudents: 1250,
      totalTeachers: 85,
      overallAttendanceRate: 94.2,
      averageAssessmentPerformance: 88.0,
      growthAnalytics: { averageVedhkritIndex: 780, monthlyGrowth: 12.5 },
    };

    await this.cache.set(cacheKey, dashboard, 300);
    return dashboard;
  }
}

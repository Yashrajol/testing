import { Injectable } from '@nestjs/common';
import { CacheService } from '@vedhkrit/cache';
import { MentorDashboardResponseDto } from '../dtos/mentor-dashboard-response.dto';

@Injectable()
export class MentorBffService {
  constructor(private readonly cache: CacheService) {}

  async getDashboard(mentorId: string): Promise<MentorDashboardResponseDto> {
    const cacheKey = `bff:mentor:${mentorId}`;
    const cached = await this.cache.get<MentorDashboardResponseDto>(cacheKey);
    if (cached) {
      return cached;
    }

    const dashboard: MentorDashboardResponseDto = {
      mentorId,
      activeMenteesCount: 12,
      upcomingSessions: [
        { studentName: 'Aarav Sharma', nextSession: '2026-07-25 15:00' },
      ],
      menteeCareerGoals: [
        { studentName: 'Rohan Verma', targetCareer: 'Full Stack Engineer', matchPercentage: 94 },
      ],
    };

    await this.cache.set(cacheKey, dashboard, 300);
    return dashboard;
  }
}

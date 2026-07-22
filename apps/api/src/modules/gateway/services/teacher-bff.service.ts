import { Injectable } from '@nestjs/common';
import { CacheService } from '@vedhkrit/cache';
import { TeacherDashboardResponseDto } from '../dtos/teacher-dashboard-response.dto';

@Injectable()
export class TeacherBffService {
  constructor(private readonly cache: CacheService) {}

  async getDashboard(teacherId: string): Promise<TeacherDashboardResponseDto> {
    const cacheKey = `bff:teacher:${teacherId}`;
    const cached = await this.cache.get<TeacherDashboardResponseDto>(cacheKey);
    if (cached) {
      return cached;
    }

    const dashboard: TeacherDashboardResponseDto = {
      teacherId,
      assignedClasses: ['Grade 10 - Section A', 'Grade 9 - Section B'],
      classAttendanceAverage: 92.8,
      pendingAssessmentsToGrade: 3,
      pendingAssignmentsToEvaluate: 5,
      weakStudents: [
        { studentName: 'Rohan Verma', riskScore: 78, weakTopic: 'Dynamic Programming' },
      ],
      classAnalytics: { averageMastery: 86.2, completionRate: 91.5 },
      notifications: ['Class 10A submitted 25 assignments', 'New curriculum chapter added'],
    };

    await this.cache.set(cacheKey, dashboard, 300);
    return dashboard;
  }
}

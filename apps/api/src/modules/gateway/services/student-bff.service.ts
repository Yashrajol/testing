import { Injectable } from '@nestjs/common';
import { CacheService } from '@vedhkrit/cache';
import { StudentDashboardResponseDto } from '../dtos/student-dashboard-response.dto';
import { GetLearningDnaHandler } from '../../learning-dna/application/handlers/get-learning-dna.handler';
import { GetVedhkritIndexHandler } from '../../growth/application/handlers/get-vedhkrit-index.handler';
import { GetCareerProfileHandler } from '../../growth/application/handlers/get-career-profile.handler';

import { GetLearningDnaQuery } from '../../learning-dna/application/queries/get-learning-dna.query';
import { GetVedhkritIndexQuery } from '../../growth/application/queries/get-vedhkrit-index.query';
import { GetCareerProfileQuery } from '../../growth/application/queries/get-career-profile.query';

@Injectable()
export class StudentBffService {
  constructor(
    private readonly cache: CacheService,
    private readonly getLearningDnaHandler: GetLearningDnaHandler,
    private readonly getVedhkritIndexHandler: GetVedhkritIndexHandler,
    private readonly getCareerProfileHandler: GetCareerProfileHandler,
  ) {}

  async getDashboard(studentId: string): Promise<StudentDashboardResponseDto> {
    const cacheKey = `bff:student:${studentId}`;
    const cached = await this.cache.get<StudentDashboardResponseDto>(cacheKey);
    if (cached) {
      return cached;
    }

    // Execute parallel sub-module query aggregations
    const [learningDna, vedhkritIndex, careerProfile] = await Promise.all([
      this.getLearningDnaHandler.execute(new GetLearningDnaQuery(studentId)).catch(() => null),
      this.getVedhkritIndexHandler.execute(new GetVedhkritIndexQuery(studentId)).catch(() => null),
      this.getCareerProfileHandler.execute(new GetCareerProfileQuery(studentId)).catch(() => null),
    ]);

    const dashboard: StudentDashboardResponseDto = {
      studentId,
      studentName: 'Aarav Sharma',
      attendancePercentage: 95.4,
      enrolledCoursesCount: 4,
      todaysLessons: [
        { title: 'Intro to Data Structures', time: '10:00 AM' },
        { title: 'Linear Algebra & Matrices', time: '02:00 PM' },
      ],
      upcomingAssessments: [
        { title: 'Mid-Term Physics Assessment', dueDate: '2026-08-01' },
      ],
      assignmentStatus: { pending: 2, completed: 15 },
      learningDna: learningDna ?? { primaryStyle: 'VISUAL', masteryScore: 84.5 },
      vedhkritIndex: vedhkritIndex ?? { score: 845, growthRate: 14.2 },
      careerMatches: careerProfile?.topMatches ?? [{ role: 'Full Stack Engineer', matchPercentage: 94 }],
      recommendations: ['Revise Graph Traversal', 'Practice Dynamic Programming'],
      notifications: ['Assignment 3 evaluated (A+)', 'New lesson uploaded'],
    };

    await this.cache.set(cacheKey, dashboard, 300); // 5 mins cache TTL
    return dashboard;
  }
}

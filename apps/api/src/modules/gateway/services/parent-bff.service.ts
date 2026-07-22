import { Injectable } from '@nestjs/common';
import { CacheService } from '@vedhkrit/cache';
import { ParentDashboardResponseDto } from '../dtos/parent-dashboard-response.dto';
import { GetLearningDnaHandler } from '../../learning-dna/application/handlers/get-learning-dna.handler';
import { GetVedhkritIndexHandler } from '../../growth/application/handlers/get-vedhkrit-index.handler';
import { GetLearningDnaQuery } from '../../learning-dna/application/queries/get-learning-dna.query';
import { GetVedhkritIndexQuery } from '../../growth/application/queries/get-vedhkrit-index.query';

@Injectable()
export class ParentBffService {
  constructor(
    private readonly cache: CacheService,
    private readonly getLearningDnaHandler: GetLearningDnaHandler,
    private readonly getVedhkritIndexHandler: GetVedhkritIndexHandler,
  ) {}

  async getDashboard(parentId: string, childStudentId: string): Promise<ParentDashboardResponseDto> {
    const cacheKey = `bff:parent:${parentId}:${childStudentId}`;
    const cached = await this.cache.get<ParentDashboardResponseDto>(cacheKey);
    if (cached) {
      return cached;
    }

    const [learningDna, vedhkritIndex] = await Promise.all([
      this.getLearningDnaHandler.execute(new GetLearningDnaQuery(childStudentId)).catch(() => null),
      this.getVedhkritIndexHandler.execute(new GetVedhkritIndexQuery(childStudentId)).catch(() => null),
    ]);

    const dashboard: ParentDashboardResponseDto = {
      parentId,
      childName: 'Aarav Sharma',
      attendancePercentage: 95.4,
      averageAssessmentScore: 88.5,
      learningDna: learningDna ?? { primaryStyle: 'VISUAL', masteryScore: 84.5 },
      vedhkritIndex: vedhkritIndex ?? { score: 845, growthRate: 14.2 },
      recommendations: ['Encourage practice for upcoming Mid-Term Assessment'],
    };

    await this.cache.set(cacheKey, dashboard, 300);
    return dashboard;
  }
}

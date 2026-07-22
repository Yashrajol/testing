import { Injectable, Inject } from '@nestjs/common';
import { ASSIGNMENT_REPOSITORY_TOKEN } from '../../constants/assignments.constants';
import { IAssignmentRepository } from '../../repositories/assignment.repository.interface';
import { GetPerformanceReportQuery } from '../queries/get-performance-report.query';
import { PerformanceReportResponseDto } from '../dtos/analytics-dto';
import { AssignmentAnalyticsService } from '../services/assignment-analytics.service';

@Injectable()
export class GetPerformanceReportHandler {
  constructor(
    @Inject(ASSIGNMENT_REPOSITORY_TOKEN)
    private readonly repo: IAssignmentRepository,
    private readonly analyticsService: AssignmentAnalyticsService,
  ) {}

  async execute(query: GetPerformanceReportQuery): Promise<PerformanceReportResponseDto> {
    const assignments = await this.repo.findAssignments({ batchId: query.batchId });
    let allSubmissions: any[] = [];

    for (const a of assignments) {
      const subs = await this.repo.findSubmissions({ assignmentId: a.id });
      allSubmissions.push(...subs);
    }

    const weakTopics = this.analyticsService.detectTopicWeaknesses(allSubmissions);
    const metrics = this.analyticsService.calculateMetrics(assignments.length * 30, allSubmissions);

    return {
      batchId: query.batchId,
      averageScorePercent: metrics.averageScore,
      weakTopics,
    };
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { ASSIGNMENT_REPOSITORY_TOKEN, AssignmentStatus } from '../../constants/assignments.constants';
import { IAssignmentRepository } from '../../repositories/assignment.repository.interface';
import { GetAssignmentDashboardQuery } from '../queries/get-assignment-dashboard.query';
import { AssignmentDashboardResponseDto } from '../dtos/analytics-dto';
import { AssignmentAnalyticsService } from '../services/assignment-analytics.service';

@Injectable()
export class GetAssignmentDashboardHandler {
  constructor(
    @Inject(ASSIGNMENT_REPOSITORY_TOKEN)
    private readonly repo: IAssignmentRepository,
    private readonly analyticsService: AssignmentAnalyticsService,
  ) {}

  async execute(query: GetAssignmentDashboardQuery): Promise<AssignmentDashboardResponseDto> {
    const assignments = await this.repo.findAssignments({
      organizationId: query.organizationId,
      batchId: query.batchId,
    });

    const published = assignments.filter((a) => a.status === AssignmentStatus.PUBLISHED);
    let allSubmissions: any[] = [];

    for (const a of published) {
      const subs = await this.repo.findSubmissions({ assignmentId: a.id });
      allSubmissions.push(...subs);
    }

    const totalAssigned = published.length * 30; // Estimated 30 students per batch
    const metrics = this.analyticsService.calculateMetrics(totalAssigned, allSubmissions);

    return {
      totalAssignments: assignments.length,
      publishedAssignments: published.length,
      totalSubmissions: metrics.totalSubmitted,
      gradedSubmissions: metrics.totalGraded,
      overallSubmissionRate: metrics.submissionRate,
      overallCompletionRate: metrics.completionRate,
      overallLateRate: metrics.lateSubmissionRate,
      overallAverageScore: metrics.averageScore,
    };
  }
}

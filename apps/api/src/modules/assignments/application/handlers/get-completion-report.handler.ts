import { Injectable, Inject } from '@nestjs/common';
import { ASSIGNMENT_REPOSITORY_TOKEN } from '../../constants/assignments.constants';
import { IAssignmentRepository } from '../../repositories/assignment.repository.interface';
import { GetCompletionReportQuery } from '../queries/get-completion-report.query';
import { CompletionReportResponseDto } from '../dtos/analytics-dto';

@Injectable()
export class GetCompletionReportHandler {
  constructor(
    @Inject(ASSIGNMENT_REPOSITORY_TOKEN)
    private readonly repo: IAssignmentRepository,
  ) {}

  async execute(query: GetCompletionReportQuery): Promise<CompletionReportResponseDto> {
    const assignments = await this.repo.findAssignments({ batchId: query.batchId });
    let totalAssigned = assignments.length * 30; // 30 students per batch assumption
    let totalCompleted = 0;

    for (const a of assignments) {
      const subs = await this.repo.findSubmissions({ assignmentId: a.id });
      totalCompleted += subs.filter((s) => s.isGraded).length;
    }

    const rate = totalAssigned > 0 ? Math.round((totalCompleted / totalAssigned) * 10000) / 100 : 100;

    return {
      batchId: query.batchId,
      completionRate: rate,
      totalAssigned,
      totalCompleted,
    };
  }
}

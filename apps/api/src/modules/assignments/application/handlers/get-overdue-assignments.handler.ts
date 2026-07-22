import { Injectable, Inject } from '@nestjs/common';
import { ASSIGNMENT_REPOSITORY_TOKEN, AssignmentStatus } from '../../constants/assignments.constants';
import { IAssignmentRepository } from '../../repositories/assignment.repository.interface';
import { GetOverdueAssignmentsQuery } from '../queries/get-overdue-assignments.query';
import { OverdueAssignmentDto } from '../dtos/analytics-dto';

@Injectable()
export class GetOverdueAssignmentsHandler {
  constructor(
    @Inject(ASSIGNMENT_REPOSITORY_TOKEN)
    private readonly repo: IAssignmentRepository,
  ) {}

  async execute(query: GetOverdueAssignmentsQuery): Promise<OverdueAssignmentDto[]> {
    const published = await this.repo.findAssignments({ status: AssignmentStatus.PUBLISHED });
    const now = new Date();
    const overdue: OverdueAssignmentDto[] = [];

    for (const a of published) {
      if (a.isPastDueDate(now)) {
        const studentSubs = await this.repo.findSubmissionsByStudent(a.id, query.studentId);
        if (studentSubs.length === 0) {
          const daysOverdue = Math.floor((now.getTime() - a.dueDate.getTime()) / (1000 * 60 * 60 * 24));
          overdue.push({
            id: a.id,
            title: a.title,
            dueDate: a.dueDate,
            totalPoints: a.totalPoints,
            category: a.category,
            daysOverdue: Math.max(1, daysOverdue),
          });
        }
      }
    }

    return overdue;
  }
}

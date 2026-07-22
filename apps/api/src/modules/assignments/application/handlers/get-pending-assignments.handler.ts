import { Injectable, Inject } from '@nestjs/common';
import { ASSIGNMENT_REPOSITORY_TOKEN, AssignmentStatus } from '../../constants/assignments.constants';
import { IAssignmentRepository } from '../../repositories/assignment.repository.interface';
import { GetPendingAssignmentsQuery } from '../queries/get-pending-assignments.query';
import { PendingAssignmentDto } from '../dtos/analytics-dto';

@Injectable()
export class GetPendingAssignmentsHandler {
  constructor(
    @Inject(ASSIGNMENT_REPOSITORY_TOKEN)
    private readonly repo: IAssignmentRepository,
  ) {}

  async execute(query: GetPendingAssignmentsQuery): Promise<PendingAssignmentDto[]> {
    const published = await this.repo.findAssignments({ status: AssignmentStatus.PUBLISHED });
    const now = new Date();
    const pending: PendingAssignmentDto[] = [];

    for (const a of published) {
      if (a.dueDate.getTime() >= now.getTime()) {
        const studentSubs = await this.repo.findSubmissionsByStudent(a.id, query.studentId);
        if (studentSubs.length === 0) {
          pending.push({
            id: a.id,
            title: a.title,
            dueDate: a.dueDate,
            totalPoints: a.totalPoints,
            category: a.category,
          });
        }
      }
    }

    return pending;
  }
}

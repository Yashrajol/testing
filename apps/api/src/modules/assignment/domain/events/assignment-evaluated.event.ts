export class AssignmentEvaluatedEvent {
  constructor(
    public readonly submissionId: string,
    public readonly assignmentId: string,
    public readonly studentId: string,
    public readonly score: number,
    public readonly evaluatorId?: string,
    public readonly timestamp: Date = new Date(),
  ) {}
}

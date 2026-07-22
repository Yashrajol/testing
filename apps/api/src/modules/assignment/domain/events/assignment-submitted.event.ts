export class AssignmentSubmittedEvent {
  constructor(
    public readonly submissionId: string,
    public readonly assignmentId: string,
    public readonly studentId: string,
    public readonly attemptNumber: number,
    public readonly isLate: boolean,
    public readonly timestamp: Date = new Date(),
  ) {}
}

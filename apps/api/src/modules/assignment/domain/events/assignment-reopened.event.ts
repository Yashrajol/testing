export class AssignmentReopenedEvent {
  constructor(
    public readonly submissionId: string,
    public readonly assignmentId: string,
    public readonly studentId: string,
    public readonly reopenedBy: string,
    public readonly timestamp: Date = new Date(),
  ) {}
}

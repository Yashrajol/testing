export class AssessmentAttemptSubmittedEvent {
  constructor(
    public readonly attemptId: string,
    public readonly studentId: string,
    public readonly timestamp: Date = new Date(),
  ) {}
}

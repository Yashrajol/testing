export class AssessmentAttemptStartedEvent {
  constructor(
    public readonly attemptId: string,
    public readonly assessmentId: string,
    public readonly studentId: string,
    public readonly timestamp: Date = new Date(),
  ) {}
}

export class AssessmentAttemptEvaluatedEvent {
  constructor(
    public readonly attemptId: string,
    public readonly totalScore: number,
    public readonly percentage: number,
    public readonly timestamp: Date = new Date(),
  ) {}
}

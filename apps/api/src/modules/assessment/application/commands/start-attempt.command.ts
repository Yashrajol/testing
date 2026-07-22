export class StartAttemptCommand {
  constructor(
    public readonly assessmentId: string,
    public readonly studentId: string,
  ) {}
}

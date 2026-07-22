export class ReopenSubmissionCommand {
  constructor(
    public readonly submissionId: string,
    public readonly reopenedBy: string,
  ) {}
}

export class AssignmentPublishedEvent {
  constructor(
    public readonly assignmentId: string,
    public readonly batchId: string,
    public readonly publishedAt: Date = new Date(),
  ) {}
}

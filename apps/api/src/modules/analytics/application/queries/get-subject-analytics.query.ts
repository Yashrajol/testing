export class GetSubjectAnalyticsQuery {
  constructor(
    public readonly studentId: string,
    public readonly subjectId: string,
  ) {}
}

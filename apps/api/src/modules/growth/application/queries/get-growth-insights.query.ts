export class GetGrowthInsightsQuery {
  constructor(
    public readonly studentId: string,
    public readonly targetAudience?: string,
  ) {}
}

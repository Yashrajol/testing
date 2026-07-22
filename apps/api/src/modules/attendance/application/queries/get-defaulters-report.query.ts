export class GetDefaultersReportQuery {
  constructor(
    public readonly batchId?: string,
    public readonly classId?: string,
    public readonly thresholdPercentage: number = 75.0,
  ) {}
}

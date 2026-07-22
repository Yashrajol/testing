export class GetMonthlyReportQuery {
  constructor(
    public readonly year: number,
    public readonly month: number,
    public readonly batchId?: string,
  ) {}
}

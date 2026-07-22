export class GetDailyAttendanceQuery {
  constructor(
    public readonly batchId: string,
    public readonly date: Date,
  ) {}
}

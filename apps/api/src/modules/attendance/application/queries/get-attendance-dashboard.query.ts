export class GetAttendanceDashboardQuery {
  constructor(
    public readonly organizationId?: string,
    public readonly batchId?: string,
    public readonly period?: string,
  ) {}
}

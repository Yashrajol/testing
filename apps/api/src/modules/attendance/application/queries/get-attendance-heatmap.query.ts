export class GetAttendanceHeatmapQuery {
  constructor(
    public readonly entityId: string,
    public readonly period: string,
  ) {}
}

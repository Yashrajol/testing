export class GetAcademicCalendarQuery {
  constructor(
    public readonly year?: number,
    public readonly month?: number,
  ) {}
}

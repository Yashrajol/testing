export class GetClassAttendanceQuery {
  constructor(
    public readonly classId: string,
    public readonly date?: Date,
  ) {}
}

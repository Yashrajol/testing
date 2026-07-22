export class LeaveRequestedEvent {
  constructor(
    public readonly leaveId: string,
    public readonly studentId: string,
    public readonly startDate: Date,
    public readonly endDate: Date,
    public readonly timestamp: Date = new Date(),
  ) {}
}

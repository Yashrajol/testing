export class ApproveLeaveCommand {
  constructor(
    public readonly leaveId: string,
    public readonly approvedBy: string,
  ) {}
}

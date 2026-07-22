export class RejectLeaveCommand {
  constructor(
    public readonly leaveId: string,
    public readonly rejectionReason: string,
    public readonly reviewedById?: string,
  ) {}
}

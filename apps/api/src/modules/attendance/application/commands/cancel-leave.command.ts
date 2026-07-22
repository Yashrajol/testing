import { CancelLeaveDto } from '../dtos/leave-dto';

export class CancelLeaveCommand {
  constructor(
    public readonly leaveId: string,
    public readonly applicantId: string,
    public readonly dto?: CancelLeaveDto,
  ) {}
}

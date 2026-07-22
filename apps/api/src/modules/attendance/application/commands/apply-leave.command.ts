import { ApplyLeaveDto } from '../dtos/leave-dto';

export class ApplyLeaveCommand {
  constructor(public readonly dto: ApplyLeaveDto) {}
}

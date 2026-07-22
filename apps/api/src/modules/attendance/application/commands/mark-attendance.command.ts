import { MarkAttendanceDto } from '../dtos/attendance-request.dto';

export class MarkAttendanceCommand {
  constructor(public readonly dto: MarkAttendanceDto, public readonly markedById?: string) {}
}

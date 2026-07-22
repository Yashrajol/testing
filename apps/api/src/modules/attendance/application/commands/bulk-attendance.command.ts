import { BulkAttendanceDto } from '../dtos/attendance-request.dto';

export class BulkAttendanceCommand {
  constructor(public readonly dto: BulkAttendanceDto, public readonly markedById?: string) {}
}

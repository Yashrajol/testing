import { CorrectAttendanceDto } from '../dtos/attendance-request.dto';

export class CorrectAttendanceCommand {
  constructor(
    public readonly recordId: string,
    public readonly dto: CorrectAttendanceDto,
    public readonly correctedById: string,
  ) {}
}

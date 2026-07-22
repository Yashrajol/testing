import { AttendanceFilterOptions } from '../../types/attendance.types';

export class GetAttendanceHistoryQuery {
  constructor(public readonly options: AttendanceFilterOptions) {}
}

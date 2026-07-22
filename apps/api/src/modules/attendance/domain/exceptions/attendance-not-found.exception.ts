export class AttendanceNotFoundException extends Error {
  constructor(identifier: string) {
    super(`Attendance entity not found for identifier: ${identifier}`);
    this.name = 'AttendanceNotFoundException';
  }
}

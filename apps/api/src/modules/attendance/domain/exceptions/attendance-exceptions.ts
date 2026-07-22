export class AttendanceNotFoundException extends Error {
  constructor(identifier: string) {
    super(`Attendance entity or record not found: ${identifier}`);
    this.name = 'AttendanceNotFoundException';
  }
}

export class SessionClosedException extends Error {
  constructor(sessionId: string) {
    super(`Attendance session ${sessionId} is closed and cannot accept new marks`);
    this.name = 'SessionClosedException';
  }
}

export class GeofenceValidationException extends Error {
  constructor(message: string) {
    super(`Geofence validation failed: ${message}`);
    this.name = 'GeofenceValidationException';
  }
}

export class LeaveConflictException extends Error {
  constructor(applicantId: string, startDate: Date, endDate: Date) {
    super(`Overlapping leave request already exists for applicant ${applicantId} between ${startDate.toISOString()} and ${endDate.toISOString()}`);
    this.name = 'LeaveConflictException';
  }
}

export class InvalidAttendanceCorrectionException extends Error {
  constructor(reason: string) {
    super(`Invalid attendance correction: ${reason}`);
    this.name = 'InvalidAttendanceCorrectionException';
  }
}

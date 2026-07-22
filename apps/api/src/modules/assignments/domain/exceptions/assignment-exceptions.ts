export class AssignmentNotFoundException extends Error {
  constructor(identifier: string) {
    super(`Assignment not found: ${identifier}`);
    this.name = 'AssignmentNotFoundException';
  }
}

export class SubmissionNotFoundException extends Error {
  constructor(identifier: string) {
    super(`Submission not found: ${identifier}`);
    this.name = 'SubmissionNotFoundException';
  }
}

export class AssignmentClosedException extends Error {
  constructor(assignmentId: string) {
    super(`Assignment ${assignmentId} is closed or archived and does not accept submissions`);
    this.name = 'AssignmentClosedException';
  }
}

export class MaxSubmissionsExceededException extends Error {
  constructor(studentId: string, maxAllowed: number) {
    super(`Student ${studentId} has exceeded maximum allowed submissions (${maxAllowed})`);
    this.name = 'MaxSubmissionsExceededException';
  }
}

export class LateSubmissionNotAllowedException extends Error {
  constructor(assignmentId: string, dueDate: Date) {
    super(`Assignment ${assignmentId} passed due date ${dueDate.toISOString()} and late submissions are disabled`);
    this.name = 'LateSubmissionNotAllowedException';
  }
}

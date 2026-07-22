export class GetStudentSubmissionQuery {
  constructor(public readonly assignmentId: string, public readonly studentId: string) {}
}

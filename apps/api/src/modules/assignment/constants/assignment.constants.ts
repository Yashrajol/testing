export const ASSIGNMENT_REPOSITORY_TOKEN = Symbol('IAssignmentRepository');

export enum AssignmentStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

export enum SubmissionStatus {
  SUBMITTED = 'SUBMITTED',
  EVALUATED = 'EVALUATED',
  REOPENED = 'REOPENED',
}

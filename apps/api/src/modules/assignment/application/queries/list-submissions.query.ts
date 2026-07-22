import { SubmissionFilterOptions } from '../../types/assignment.types';

export class ListSubmissionsQuery {
  constructor(public readonly options: SubmissionFilterOptions) {}
}

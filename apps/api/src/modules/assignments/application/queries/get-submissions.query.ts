import { SubmissionFilterOptions } from '../../types/assignments.types';

export class GetSubmissionsQuery {
  constructor(public readonly options: SubmissionFilterOptions) {}
}

import { AssignmentFilterOptions } from '../../types/assignment.types';

export class ListAssignmentsQuery {
  constructor(public readonly options: AssignmentFilterOptions) {}
}

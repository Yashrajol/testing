import { AssessmentFilterOptions } from '../../types/assessment.types';

export class ListAssessmentsQuery {
  constructor(public readonly options: AssessmentFilterOptions) {}
}

import { AIRequestFilterOptions } from '../../types/ai.types';

export class GetAIHistoryQuery {
  constructor(public readonly options?: AIRequestFilterOptions) {}
}

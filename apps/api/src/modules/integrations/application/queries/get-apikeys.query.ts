import { ApiKeyFilterOptions } from '../../types/integrations.types';

export class GetApiKeysQuery {
  constructor(public readonly options?: ApiKeyFilterOptions) {}
}

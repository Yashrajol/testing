import { IntegrationFilterOptions } from '../../types/integrations.types';

export class GetIntegrationsQuery {
  constructor(public readonly options?: IntegrationFilterOptions) {}
}

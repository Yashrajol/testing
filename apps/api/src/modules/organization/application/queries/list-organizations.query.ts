import { OrganizationFilterOptions } from '../../types/organization.types';

export class ListOrganizationsQuery {
  constructor(public readonly options?: OrganizationFilterOptions) {}
}

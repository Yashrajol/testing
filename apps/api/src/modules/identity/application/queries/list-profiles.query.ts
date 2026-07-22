import { ProfileFilterOptions } from '../../types/identity.types';

export class ListProfilesQuery {
  constructor(public readonly options: ProfileFilterOptions) {}
}

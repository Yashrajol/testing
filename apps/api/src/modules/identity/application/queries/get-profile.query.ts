import { ProfileType } from '../../constants/identity.constants';

export class GetProfileQuery {
  constructor(
    public readonly userId: string,
    public readonly type: ProfileType,
  ) {}
}

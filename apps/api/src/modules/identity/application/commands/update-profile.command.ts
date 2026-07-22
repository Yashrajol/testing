import { ProfileType } from '../../constants/identity.constants';

export class UpdateProfileCommand {
  constructor(
    public readonly userId: string,
    public readonly type: ProfileType,
    public readonly updates: any,
  ) {}
}

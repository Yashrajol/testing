import { ProfileType } from '../../constants/identity.constants';

export class CreateProfileCommand {
  constructor(
    public readonly userId: string,
    public readonly type: ProfileType,
    public readonly payload: any,
  ) {}
}

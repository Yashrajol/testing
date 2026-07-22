import { ProfileType } from '../../constants/identity.constants';

export class ProfileUpdatedEvent {
  constructor(
    public readonly profileId: string,
    public readonly userId: string,
    public readonly type: ProfileType,
    public readonly updatedFields: string[],
    public readonly timestamp: Date = new Date(),
  ) {}
}

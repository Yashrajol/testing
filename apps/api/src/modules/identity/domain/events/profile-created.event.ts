import { ProfileType } from '../../constants/identity.constants';

export class ProfileCreatedEvent {
  constructor(
    public readonly profileId: string,
    public readonly userId: string,
    public readonly type: ProfileType,
    public readonly timestamp: Date = new Date(),
  ) {}
}

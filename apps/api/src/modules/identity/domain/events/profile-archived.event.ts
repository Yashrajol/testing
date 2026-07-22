import { ProfileType } from '../../constants/identity.constants';

export class ProfileArchivedEvent {
  constructor(
    public readonly profileId: string,
    public readonly userId: string,
    public readonly type: ProfileType,
    public readonly archivedBy: string,
    public readonly timestamp: Date = new Date(),
  ) {}
}

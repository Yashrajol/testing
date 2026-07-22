import { ProfileType } from '../../constants/identity.constants';

export class ArchiveProfileCommand {
  constructor(
    public readonly userId: string,
    public readonly type: ProfileType,
    public readonly archivedBy: string,
  ) {}
}

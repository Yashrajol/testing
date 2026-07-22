import { Injectable, Inject } from '@nestjs/common';
import { IDENTITY_REPOSITORY_TOKEN } from '../../constants/identity.constants';
import { IIdentityRepository } from '../../repositories/identity.repository.interface';
import { ArchiveProfileCommand } from '../commands/archive-profile.command';
import { ProfileNotFoundException } from '../../domain/exceptions/profile-not-found.exception';
import { ProfileArchivedEvent } from '../../domain/events/profile-archived.event';

@Injectable()
export class ArchiveProfileHandler {
  constructor(
    @Inject(IDENTITY_REPOSITORY_TOKEN)
    private readonly repo: IIdentityRepository,
  ) {}

  async execute(command: ArchiveProfileCommand): Promise<{ event: ProfileArchivedEvent }> {
    const existing = await this.repo.findProfileByUserId(command.userId, command.type);
    if (!existing) {
      throw new ProfileNotFoundException(command.userId);
    }

    await this.repo.softDeleteProfile(command.userId, command.type);
    const event = new ProfileArchivedEvent(existing.id, command.userId, command.type, command.archivedBy);

    return { event };
  }
}

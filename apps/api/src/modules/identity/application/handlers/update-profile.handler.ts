import { Injectable, Inject } from '@nestjs/common';
import { IDENTITY_REPOSITORY_TOKEN } from '../../constants/identity.constants';
import { IIdentityRepository } from '../../repositories/identity.repository.interface';
import { UpdateProfileCommand } from '../commands/update-profile.command';
import { ProfileResponseDto } from '../dtos/profile-response.dto';
import { ProfileMapper } from '../mappers/profile.mapper';
import { ProfileNotFoundException } from '../../domain/exceptions/profile-not-found.exception';
import { ProfileUpdatedEvent } from '../../domain/events/profile-updated.event';

@Injectable()
export class UpdateProfileHandler {
  constructor(
    @Inject(IDENTITY_REPOSITORY_TOKEN)
    private readonly repo: IIdentityRepository,
  ) {}

  async execute(command: UpdateProfileCommand): Promise<{ profile: ProfileResponseDto; event: ProfileUpdatedEvent }> {
    const updatedEntity = await this.repo.updateProfile(command.userId, command.type, command.updates);
    if (!updatedEntity) {
      throw new ProfileNotFoundException(command.userId);
    }

    const event = new ProfileUpdatedEvent(
      updatedEntity.id,
      command.userId,
      command.type,
      Object.keys(command.updates),
    );

    return {
      profile: ProfileMapper.toResponseDto(command.type, updatedEntity),
      event,
    };
  }
}

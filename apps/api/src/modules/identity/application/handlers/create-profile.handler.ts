import { Injectable, Inject } from '@nestjs/common';
import { IDENTITY_REPOSITORY_TOKEN } from '../../constants/identity.constants';
import { IIdentityRepository } from '../../repositories/identity.repository.interface';
import { CreateProfileCommand } from '../commands/create-profile.command';
import { ProfileResponseDto } from '../dtos/profile-response.dto';
import { ProfileMapper } from '../mappers/profile.mapper';
import { ProfileCreatedEvent } from '../../domain/events/profile-created.event';

@Injectable()
export class CreateProfileHandler {
  constructor(
    @Inject(IDENTITY_REPOSITORY_TOKEN)
    private readonly repo: IIdentityRepository,
  ) {}

  async execute(command: CreateProfileCommand): Promise<{ profile: ProfileResponseDto; event: ProfileCreatedEvent }> {
    const entity = await this.repo.createProfile(command.userId, command.type, command.payload);
    const event = new ProfileCreatedEvent(entity.id, command.userId, command.type);

    return {
      profile: ProfileMapper.toResponseDto(command.type, entity),
      event,
    };
  }
}

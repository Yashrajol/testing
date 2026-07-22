import { Injectable, Inject } from '@nestjs/common';
import { IDENTITY_REPOSITORY_TOKEN } from '../../constants/identity.constants';
import { IIdentityRepository } from '../../repositories/identity.repository.interface';
import { GetProfileQuery } from '../queries/get-profile.query';
import { ProfileResponseDto } from '../dtos/profile-response.dto';
import { ProfileMapper } from '../mappers/profile.mapper';
import { ProfileNotFoundException } from '../../domain/exceptions/profile-not-found.exception';

@Injectable()
export class GetProfileHandler {
  constructor(
    @Inject(IDENTITY_REPOSITORY_TOKEN)
    private readonly repo: IIdentityRepository,
  ) {}

  async execute(query: GetProfileQuery): Promise<ProfileResponseDto> {
    const profile = await this.repo.findProfileByUserId(query.userId, query.type);
    if (!profile) {
      throw new ProfileNotFoundException(query.userId);
    }
    return ProfileMapper.toResponseDto(query.type, profile);
  }
}

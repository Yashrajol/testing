import { Injectable, Inject } from '@nestjs/common';
import { IDENTITY_REPOSITORY_TOKEN } from '../../constants/identity.constants';
import { IIdentityRepository } from '../../repositories/identity.repository.interface';
import { ListProfilesQuery } from '../queries/list-profiles.query';
import { ProfileResponseDto } from '../dtos/profile-response.dto';
import { ProfileMapper } from '../mappers/profile.mapper';

@Injectable()
export class ListProfilesHandler {
  constructor(
    @Inject(IDENTITY_REPOSITORY_TOKEN)
    private readonly repo: IIdentityRepository,
  ) {}

  async execute(query: ListProfilesQuery): Promise<{ items: ProfileResponseDto[]; total: number }> {
    const { items, total } = await this.repo.findProfiles(query.options);
    return {
      items: items.map((entity) => ProfileMapper.toResponseDto(query.options.type, entity)),
      total,
    };
  }
}

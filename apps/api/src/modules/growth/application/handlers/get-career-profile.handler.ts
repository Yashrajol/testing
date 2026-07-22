import { Injectable, Inject } from '@nestjs/common';
import { GROWTH_REPOSITORY_TOKEN } from '../../constants/growth.constants';
import { IGrowthRepository } from '../../repositories/growth.repository.interface';
import { GetCareerProfileQuery } from '../queries/get-career-profile.query';
import { CareerProfileResponseDto } from '../dtos/growth-response.dto';
import { GrowthMapper } from '../mappers/growth.mapper';
import { GrowthNotFoundException } from '../../domain/exceptions/growth-not-found.exception';

@Injectable()
export class GetCareerProfileHandler {
  constructor(
    @Inject(GROWTH_REPOSITORY_TOKEN)
    private readonly repo: IGrowthRepository,
  ) {}

  async execute(query: GetCareerProfileQuery): Promise<CareerProfileResponseDto> {
    const profile = await this.repo.findCareerProfile(query.studentId);
    if (!profile) {
      throw new GrowthNotFoundException(query.studentId);
    }
    return GrowthMapper.toCareerDto(profile);
  }
}

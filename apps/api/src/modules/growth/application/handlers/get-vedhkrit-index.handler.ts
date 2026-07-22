import { Injectable, Inject } from '@nestjs/common';
import { GROWTH_REPOSITORY_TOKEN } from '../../constants/growth.constants';
import { IGrowthRepository } from '../../repositories/growth.repository.interface';
import { GetVedhkritIndexQuery } from '../queries/get-vedhkrit-index.query';
import { VedhkritIndexResponseDto } from '../dtos/growth-response.dto';
import { GrowthMapper } from '../mappers/growth.mapper';
import { GrowthNotFoundException } from '../../domain/exceptions/growth-not-found.exception';

@Injectable()
export class GetVedhkritIndexHandler {
  constructor(
    @Inject(GROWTH_REPOSITORY_TOKEN)
    private readonly repo: IGrowthRepository,
  ) {}

  async execute(query: GetVedhkritIndexQuery): Promise<VedhkritIndexResponseDto> {
    const index = await this.repo.findVedhkritIndex(query.studentId);
    if (!index) {
      throw new GrowthNotFoundException(query.studentId);
    }
    return GrowthMapper.toIndexDto(index);
  }
}

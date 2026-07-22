import { Injectable, Inject } from '@nestjs/common';
import { ACADEMICS_REPOSITORY_TOKEN } from '../../constants/academics.constants';
import { IAcademicsRepository } from '../../repositories/academics.repository.interface';
import { ListAcademicEntitiesQuery } from '../queries/list-academic-entities.query';
import { AcademicEntityResponseDto } from '../dtos/academics-response.dto';
import { AcademicsMapper } from '../mappers/academics.mapper';

@Injectable()
export class ListAcademicEntitiesHandler {
  constructor(
    @Inject(ACADEMICS_REPOSITORY_TOKEN)
    private readonly repo: IAcademicsRepository,
  ) {}

  async execute(query: ListAcademicEntitiesQuery): Promise<{ items: AcademicEntityResponseDto[]; total: number }> {
    const { items, total } = await this.repo.findMany(query.options);
    return {
      items: items.map((entity) => AcademicsMapper.toResponseDto(query.options.entityType, entity)),
      total,
    };
  }
}

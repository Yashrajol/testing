import { Injectable, Inject } from '@nestjs/common';
import { ACADEMICS_REPOSITORY_TOKEN } from '../../constants/academics.constants';
import { IAcademicsRepository } from '../../repositories/academics.repository.interface';
import { GetAcademicEntityQuery } from '../queries/get-academic-entity.query';
import { AcademicEntityResponseDto } from '../dtos/academics-response.dto';
import { AcademicsMapper } from '../mappers/academics.mapper';
import { AcademicNotFoundException } from '../../domain/exceptions/academic-not-found.exception';

@Injectable()
export class GetAcademicEntityHandler {
  constructor(
    @Inject(ACADEMICS_REPOSITORY_TOKEN)
    private readonly repo: IAcademicsRepository,
  ) {}

  async execute(query: GetAcademicEntityQuery): Promise<AcademicEntityResponseDto> {
    const entity = await this.repo.findById(query.entityType, query.id);
    if (!entity) {
      throw new AcademicNotFoundException(query.entityType, query.id);
    }
    return AcademicsMapper.toResponseDto(query.entityType, entity);
  }
}

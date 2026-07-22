import { Injectable, Inject } from '@nestjs/common';
import { ACADEMICS_REPOSITORY_TOKEN } from '../../constants/academics.constants';
import { IAcademicsRepository } from '../../repositories/academics.repository.interface';
import { CreateAcademicEntityCommand } from '../commands/create-academic-entity.command';
import { AcademicEntityResponseDto } from '../dtos/academics-response.dto';
import { AcademicsMapper } from '../mappers/academics.mapper';
import { AcademicEntityCreatedEvent } from '../../domain/events/academic-entity-created.event';

@Injectable()
export class CreateAcademicEntityHandler {
  constructor(
    @Inject(ACADEMICS_REPOSITORY_TOKEN)
    private readonly repo: IAcademicsRepository,
  ) {}

  async execute(command: CreateAcademicEntityCommand): Promise<{ result: AcademicEntityResponseDto; event: AcademicEntityCreatedEvent }> {
    const entity = await this.repo.create(command.entityType, command.payload);
    const event = new AcademicEntityCreatedEvent(entity.id, command.entityType, entity.name || `AcademicEntity-${entity.id}`);

    return {
      result: AcademicsMapper.toResponseDto(command.entityType, entity),
      event,
    };
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { ACADEMICS_REPOSITORY_TOKEN } from '../../constants/academics.constants';
import { IAcademicsRepository } from '../../repositories/academics.repository.interface';
import { UpdateAcademicEntityCommand } from '../commands/update-academic-entity.command';
import { AcademicEntityResponseDto } from '../dtos/academics-response.dto';
import { AcademicsMapper } from '../mappers/academics.mapper';
import { AcademicNotFoundException } from '../../domain/exceptions/academic-not-found.exception';
import { AcademicEntityUpdatedEvent } from '../../domain/events/academic-entity-updated.event';

@Injectable()
export class UpdateAcademicEntityHandler {
  constructor(
    @Inject(ACADEMICS_REPOSITORY_TOKEN)
    private readonly repo: IAcademicsRepository,
  ) {}

  async execute(command: UpdateAcademicEntityCommand): Promise<{ result: AcademicEntityResponseDto; event: AcademicEntityUpdatedEvent }> {
    const existing = await this.repo.findById(command.entityType, command.id);
    if (!existing) {
      throw new AcademicNotFoundException(command.entityType, command.id);
    }

    const updated = await this.repo.update(command.entityType, command.id, command.updates);
    const event = new AcademicEntityUpdatedEvent(command.id, command.entityType, Object.keys(command.updates));

    return {
      result: AcademicsMapper.toResponseDto(command.entityType, updated),
      event,
    };
  }
}

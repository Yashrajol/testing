import { Injectable, Inject } from '@nestjs/common';
import { ACADEMICS_REPOSITORY_TOKEN } from '../../constants/academics.constants';
import { IAcademicsRepository } from '../../repositories/academics.repository.interface';
import { ArchiveAcademicEntityCommand } from '../commands/archive-academic-entity.command';
import { AcademicNotFoundException } from '../../domain/exceptions/academic-not-found.exception';
import { AcademicEntityArchivedEvent } from '../../domain/events/academic-entity-archived.event';

@Injectable()
export class ArchiveAcademicEntityHandler {
  constructor(
    @Inject(ACADEMICS_REPOSITORY_TOKEN)
    private readonly repo: IAcademicsRepository,
  ) {}

  async execute(command: ArchiveAcademicEntityCommand): Promise<{ event: AcademicEntityArchivedEvent }> {
    const existing = await this.repo.findById(command.entityType, command.id);
    if (!existing) {
      throw new AcademicNotFoundException(command.entityType, command.id);
    }

    await this.repo.softDelete(command.entityType, command.id);
    const event = new AcademicEntityArchivedEvent(command.id, command.entityType, command.archivedBy);

    return { event };
  }
}

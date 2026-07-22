import { Injectable, Inject } from '@nestjs/common';
import { ORGANIZATION_REPOSITORY_TOKEN } from '../../constants/organization.constants';
import { IOrganizationRepository } from '../../repositories/organization.repository.interface';
import { ArchiveOrganizationCommand } from '../commands/archive-organization.command';
import { OrganizationNotFoundException } from '../../domain/exceptions/organization-not-found.exception';
import { OrganizationArchivedEvent } from '../../domain/events/organization-archived.event';

@Injectable()
export class ArchiveOrganizationHandler {
  constructor(
    @Inject(ORGANIZATION_REPOSITORY_TOKEN)
    private readonly repo: IOrganizationRepository,
  ) {}

  async execute(command: ArchiveOrganizationCommand): Promise<{ event: OrganizationArchivedEvent }> {
    const existing = await this.repo.findById(command.id);
    if (!existing) {
      throw new OrganizationNotFoundException(command.id);
    }

    await this.repo.softDelete(command.id);
    const event = new OrganizationArchivedEvent(command.id, command.archivedBy);

    return { event };
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { ORGANIZATION_REPOSITORY_TOKEN } from '../../constants/organization.constants';
import { IOrganizationRepository } from '../../repositories/organization.repository.interface';
import { UpdateOrganizationCommand } from '../commands/update-organization.command';
import { OrganizationResponseDto } from '../dtos/organization-response.dto';
import { OrganizationMapper } from '../mappers/organization.mapper';
import { OrganizationNotFoundException } from '../../domain/exceptions/organization-not-found.exception';
import { OrganizationUpdatedEvent } from '../../domain/events/organization-updated.event';

@Injectable()
export class UpdateOrganizationHandler {
  constructor(
    @Inject(ORGANIZATION_REPOSITORY_TOKEN)
    private readonly repo: IOrganizationRepository,
  ) {}

  async execute(command: UpdateOrganizationCommand): Promise<{ organization: OrganizationResponseDto; event: OrganizationUpdatedEvent }> {
    const existing = await this.repo.findById(command.id);
    if (!existing) {
      throw new OrganizationNotFoundException(command.id);
    }

    const updatedEntity = await this.repo.update(command.id, command.updates);
    const event = new OrganizationUpdatedEvent(updatedEntity.id, Object.keys(command.updates));

    return {
      organization: OrganizationMapper.toResponseDto(updatedEntity),
      event,
    };
  }
}

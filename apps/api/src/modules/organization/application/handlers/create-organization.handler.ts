import { Injectable, Inject } from '@nestjs/common';
import { ORGANIZATION_REPOSITORY_TOKEN } from '../../constants/organization.constants';
import { IOrganizationRepository } from '../../repositories/organization.repository.interface';
import { CreateOrganizationCommand } from '../commands/create-organization.command';
import { OrganizationResponseDto } from '../dtos/organization-response.dto';
import { OrganizationMapper } from '../mappers/organization.mapper';
import { OrganizationAlreadyExistsException } from '../../domain/exceptions/organization-already-exists.exception';
import { OrganizationCreatedEvent } from '../../domain/events/organization-created.event';

@Injectable()
export class CreateOrganizationHandler {
  constructor(
    @Inject(ORGANIZATION_REPOSITORY_TOKEN)
    private readonly repo: IOrganizationRepository,
  ) {}

  async execute(command: CreateOrganizationCommand): Promise<{ organization: OrganizationResponseDto; event: OrganizationCreatedEvent }> {
    const existing = await this.repo.findBySlug(command.slug);
    if (existing) {
      throw new OrganizationAlreadyExistsException('slug', command.slug);
    }

    const entity = await this.repo.create({
      name: command.name,
      slug: command.slug,
      legalName: command.legalName,
      registrationNumber: command.registrationNumber,
      taxNumber: command.taxNumber,
      logoUrl: command.logoUrl,
      website: command.website,
      email: command.email,
      phone: command.phone,
      address: command.address,
      timezone: command.timezone,
      locale: command.locale,
      currency: command.currency,
    });

    const event = new OrganizationCreatedEvent(entity.id, entity.name, entity.slug);

    return {
      organization: OrganizationMapper.toResponseDto(entity),
      event,
    };
  }
}

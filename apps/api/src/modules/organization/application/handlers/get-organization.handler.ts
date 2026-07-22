import { Injectable, Inject } from '@nestjs/common';
import { ORGANIZATION_REPOSITORY_TOKEN } from '../../constants/organization.constants';
import { IOrganizationRepository } from '../../repositories/organization.repository.interface';
import { GetOrganizationQuery } from '../queries/get-organization.query';
import { OrganizationResponseDto } from '../dtos/organization-response.dto';
import { OrganizationMapper } from '../mappers/organization.mapper';
import { OrganizationNotFoundException } from '../../domain/exceptions/organization-not-found.exception';

@Injectable()
export class GetOrganizationHandler {
  constructor(
    @Inject(ORGANIZATION_REPOSITORY_TOKEN)
    private readonly repo: IOrganizationRepository,
  ) {}

  async execute(query: GetOrganizationQuery): Promise<OrganizationResponseDto> {
    const byId = await this.repo.findById(query.idOrSlug);
    if (byId) {
      return OrganizationMapper.toResponseDto(byId);
    }

    const bySlug = await this.repo.findBySlug(query.idOrSlug);
    if (bySlug) {
      return OrganizationMapper.toResponseDto(bySlug);
    }

    throw new OrganizationNotFoundException(query.idOrSlug);
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { ORGANIZATION_REPOSITORY_TOKEN } from '../../constants/organization.constants';
import { IOrganizationRepository } from '../../repositories/organization.repository.interface';
import { ListOrganizationsQuery } from '../queries/list-organizations.query';
import { OrganizationResponseDto } from '../dtos/organization-response.dto';
import { OrganizationMapper } from '../mappers/organization.mapper';

@Injectable()
export class ListOrganizationsHandler {
  constructor(
    @Inject(ORGANIZATION_REPOSITORY_TOKEN)
    private readonly repo: IOrganizationRepository,
  ) {}

  async execute(query: ListOrganizationsQuery): Promise<{ items: OrganizationResponseDto[]; total: number }> {
    const { items, total } = await this.repo.findMany(query.options);
    return {
      items: items.map((entity) => OrganizationMapper.toResponseDto(entity)),
      total,
    };
  }
}

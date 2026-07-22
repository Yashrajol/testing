import { Provider } from '@nestjs/common';
import { ORGANIZATION_REPOSITORY_TOKEN } from './constants/organization.constants';
import { OrganizationRepository } from './repositories/organization.repository';
import { CreateOrganizationHandler } from './application/handlers/create-organization.handler';
import { UpdateOrganizationHandler } from './application/handlers/update-organization.handler';
import { ArchiveOrganizationHandler } from './application/handlers/archive-organization.handler';
import { GetOrganizationHandler } from './application/handlers/get-organization.handler';
import { ListOrganizationsHandler } from './application/handlers/list-organizations.handler';
import { OrganizationTenantGuard } from './security/organization-tenant.guard';

export const ORGANIZATION_PROVIDERS: Provider[] = [
  OrganizationRepository,
  {
    provide: ORGANIZATION_REPOSITORY_TOKEN,
    useClass: OrganizationRepository,
  },
  CreateOrganizationHandler,
  UpdateOrganizationHandler,
  ArchiveOrganizationHandler,
  GetOrganizationHandler,
  ListOrganizationsHandler,
  OrganizationTenantGuard,
];

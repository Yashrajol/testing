import { Provider } from '@nestjs/common';
import { IDENTITY_REPOSITORY_TOKEN } from './constants/identity.constants';
import { IdentityRepository } from './repositories/identity.repository';
import { CreateProfileHandler } from './application/handlers/create-profile.handler';
import { UpdateProfileHandler } from './application/handlers/update-profile.handler';
import { ArchiveProfileHandler } from './application/handlers/archive-profile.handler';
import { GetProfileHandler } from './application/handlers/get-profile.handler';
import { ListProfilesHandler } from './application/handlers/list-profiles.handler';

export const IDENTITY_PROVIDERS: Provider[] = [
  IdentityRepository,
  {
    provide: IDENTITY_REPOSITORY_TOKEN,
    useClass: IdentityRepository,
  },
  CreateProfileHandler,
  UpdateProfileHandler,
  ArchiveProfileHandler,
  GetProfileHandler,
  ListProfilesHandler,
];

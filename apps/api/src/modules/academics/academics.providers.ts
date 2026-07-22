import { Provider } from '@nestjs/common';
import { ACADEMICS_REPOSITORY_TOKEN } from './constants/academics.constants';
import { AcademicsRepository } from './repositories/academics.repository';
import { CreateAcademicEntityHandler } from './application/handlers/create-academic-entity.handler';
import { UpdateAcademicEntityHandler } from './application/handlers/update-academic-entity.handler';
import { ArchiveAcademicEntityHandler } from './application/handlers/archive-academic-entity.handler';
import { GetAcademicEntityHandler } from './application/handlers/get-academic-entity.handler';
import { ListAcademicEntitiesHandler } from './application/handlers/list-academic-entities.handler';

export const ACADEMICS_PROVIDERS: Provider[] = [
  AcademicsRepository,
  {
    provide: ACADEMICS_REPOSITORY_TOKEN,
    useClass: AcademicsRepository,
  },
  CreateAcademicEntityHandler,
  UpdateAcademicEntityHandler,
  ArchiveAcademicEntityHandler,
  GetAcademicEntityHandler,
  ListAcademicEntitiesHandler,
];

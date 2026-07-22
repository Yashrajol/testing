import { Provider } from '@nestjs/common';
import { LEARNING_REPOSITORY_TOKEN } from './constants/learning.constants';
import { LearningRepository } from './repositories/learning.repository';
import { CreateLearningEntityHandler } from './application/handlers/create-learning-entity.handler';
import { UpdateLearningEntityHandler } from './application/handlers/update-learning-entity.handler';
import { ArchiveLearningEntityHandler } from './application/handlers/archive-learning-entity.handler';
import { GetLearningEntityHandler } from './application/handlers/get-learning-entity.handler';
import { ListLearningEntitiesHandler } from './application/handlers/list-learning-entities.handler';

export const LEARNING_PROVIDERS: Provider[] = [
  LearningRepository,
  {
    provide: LEARNING_REPOSITORY_TOKEN,
    useClass: LearningRepository,
  },
  CreateLearningEntityHandler,
  UpdateLearningEntityHandler,
  ArchiveLearningEntityHandler,
  GetLearningEntityHandler,
  ListLearningEntitiesHandler,
];

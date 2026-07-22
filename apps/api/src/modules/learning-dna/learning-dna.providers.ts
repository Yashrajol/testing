import { Provider } from '@nestjs/common';
import { LEARNING_DNA_REPOSITORY_TOKEN } from './constants/learning-dna.constants';
import { LearningDnaRepository } from './repositories/learning-dna.repository';
import { DnaAlgorithmService } from './application/services/dna-algorithm.service';

import { RecalculateDnaHandler } from './application/handlers/recalculate-dna.handler';
import { GenerateAdaptivePathHandler } from './application/handlers/generate-adaptive-path.handler';
import { GetLearningDnaHandler } from './application/handlers/get-learning-dna.handler';
import { GetAdaptivePathHandler } from './application/handlers/get-adaptive-path.handler';
import { LearningEventsListener } from './application/listeners/learning-events.listener';

export const LEARNING_DNA_PROVIDERS: Provider[] = [
  LearningDnaRepository,
  {
    provide: LEARNING_DNA_REPOSITORY_TOKEN,
    useClass: LearningDnaRepository,
  },
  DnaAlgorithmService,
  RecalculateDnaHandler,
  GenerateAdaptivePathHandler,
  GetLearningDnaHandler,
  GetAdaptivePathHandler,
  LearningEventsListener,
];

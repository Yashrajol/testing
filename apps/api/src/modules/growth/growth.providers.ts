import { Provider } from '@nestjs/common';
import { GROWTH_REPOSITORY_TOKEN } from './constants/growth.constants';
import { GrowthRepository } from './repositories/growth.repository';

import { CalculateVedhkritIndexHandler } from './application/handlers/calculate-vedhkrit-index.handler';
import { GenerateCareerRecommendationsHandler } from './application/handlers/generate-career-recommendations.handler';
import { CreateGoalHandler } from './application/handlers/create-goal.handler';

import { GetVedhkritIndexHandler } from './application/handlers/get-vedhkrit-index.handler';
import { GetCareerProfileHandler } from './application/handlers/get-career-profile.handler';
import { GetGrowthInsightsHandler } from './application/handlers/get-growth-insights.handler';
import { ListGoalsHandler } from './application/handlers/list-goals.handler';

export const GROWTH_PROVIDERS: Provider[] = [
  GrowthRepository,
  {
    provide: GROWTH_REPOSITORY_TOKEN,
    useClass: GrowthRepository,
  },
  CalculateVedhkritIndexHandler,
  GenerateCareerRecommendationsHandler,
  CreateGoalHandler,
  GetVedhkritIndexHandler,
  GetCareerProfileHandler,
  GetGrowthInsightsHandler,
  ListGoalsHandler,
];

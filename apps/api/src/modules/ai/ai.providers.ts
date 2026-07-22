import { Provider } from '@nestjs/common';
import { AI_REPOSITORY_TOKEN } from './constants/ai.constants';
import { AIRepository } from './repositories/ai.repository';
import { OpenAIProvider } from './providers/openai.provider';
import { GeminiProvider } from './providers/gemini.provider';
import { AnthropicProvider } from './providers/anthropic.provider';
import { AzureOpenAIProvider } from './providers/azure-openai.provider';
import { AIGatewayService } from './application/services/ai-gateway.service';
import { CostTrackerService } from './application/services/cost-tracker.service';
import { GenerateStudyPlanHandler } from './application/handlers/generate-study-plan.handler';
import { GenerateInsightsHandler } from './application/handlers/generate-insights.handler';
import { GenerateCareerAdviceHandler } from './application/handlers/generate-career-advice.handler';
import { GenerateRiskAnalysisHandler } from './application/handlers/generate-risk-analysis.handler';
import { GenerateTeacherAssistantHandler } from './application/handlers/generate-teacher-assistant.handler';
import { GenerateParentSummaryHandler } from './application/handlers/generate-parent-summary.handler';
import { GetAIHistoryHandler } from './application/handlers/get-ai-history.handler';
import { GetUsageStatsHandler } from './application/handlers/get-usage-stats.handler';

export const aiProviders: Provider[] = [
  {
    provide: AI_REPOSITORY_TOKEN,
    useClass: AIRepository,
  },
  OpenAIProvider,
  GeminiProvider,
  AnthropicProvider,
  AzureOpenAIProvider,
  AIGatewayService,
  CostTrackerService,
  GenerateStudyPlanHandler,
  GenerateInsightsHandler,
  GenerateCareerAdviceHandler,
  GenerateRiskAnalysisHandler,
  GenerateTeacherAssistantHandler,
  GenerateParentSummaryHandler,
  GetAIHistoryHandler,
  GetUsageStatsHandler,
];

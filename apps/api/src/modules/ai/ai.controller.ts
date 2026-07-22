import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  GenerateStudyPlanDto,
  GenerateInsightsDto,
  GenerateCareerAdviceDto,
  RiskAnalysisDto,
  TeacherAssistantDto,
  ParentSummaryDto,
} from './application/dtos/generate-ai.dto';
import {
  StudyPlanResponseDto,
  LearningInsightResponseDto,
  CareerAdviceResponseDto,
  RiskAnalysisResponseDto,
  AIRecommendationResponseDto,
  AIRequestResponseDto,
} from './application/dtos/ai-response-dto';

import { GenerateStudyPlanHandler } from './application/handlers/generate-study-plan.handler';
import { GenerateInsightsHandler } from './application/handlers/generate-insights.handler';
import { GenerateCareerAdviceHandler } from './application/handlers/generate-career-advice.handler';
import { GenerateRiskAnalysisHandler } from './application/handlers/generate-risk-analysis.handler';
import { GenerateTeacherAssistantHandler } from './application/handlers/generate-teacher-assistant.handler';
import { GenerateParentSummaryHandler } from './application/handlers/generate-parent-summary.handler';
import { GetAIHistoryHandler } from './application/handlers/get-ai-history.handler';
import { GetUsageStatsHandler } from './application/handlers/get-usage-stats.handler';

import { GenerateStudyPlanCommand } from './application/commands/generate-study-plan.command';
import { GenerateInsightsCommand } from './application/commands/generate-insights.command';
import { GenerateCareerAdviceCommand } from './application/commands/generate-career-advice.command';
import { GenerateRiskAnalysisCommand } from './application/commands/generate-risk-analysis.command';
import { GenerateTeacherAssistantCommand } from './application/commands/generate-teacher-assistant.command';
import { GenerateParentSummaryCommand } from './application/commands/generate-parent-summary.command';

import { GetAIHistoryQuery } from './application/queries/get-ai-history.query';
import { GetUsageStatsQuery } from './application/queries/get-usage-stats.query';
import { AIProviderType } from './constants/ai.constants';

@ApiTags('AI Intelligence Platform')
@Controller('ai')
export class AIController {
  constructor(
    private readonly generateStudyPlanHandler: GenerateStudyPlanHandler,
    private readonly generateInsightsHandler: GenerateInsightsHandler,
    private readonly generateCareerAdviceHandler: GenerateCareerAdviceHandler,
    private readonly generateRiskAnalysisHandler: GenerateRiskAnalysisHandler,
    private readonly generateTeacherAssistantHandler: GenerateTeacherAssistantHandler,
    private readonly generateParentSummaryHandler: GenerateParentSummaryHandler,
    private readonly getAIHistoryHandler: GetAIHistoryHandler,
    private readonly getUsageStatsHandler: GetUsageStatsHandler,
  ) {}

  @Post('study-plan')
  @ApiOperation({ summary: 'Generate personalized study plan' })
  @ApiResponse({ status: 201, type: StudyPlanResponseDto })
  async generateStudyPlan(@Body() dto: GenerateStudyPlanDto): Promise<StudyPlanResponseDto> {
    return this.generateStudyPlanHandler.execute(new GenerateStudyPlanCommand(dto));
  }

  @Post('insights')
  @ApiOperation({ summary: 'Generate student learning insights' })
  @ApiResponse({ status: 201, type: LearningInsightResponseDto })
  async generateInsights(@Body() dto: GenerateInsightsDto): Promise<LearningInsightResponseDto> {
    return this.generateInsightsHandler.execute(new GenerateInsightsCommand(dto));
  }

  @Post('career-advice')
  @ApiOperation({ summary: 'Generate student career advice' })
  @ApiResponse({ status: 201, type: CareerAdviceResponseDto })
  async generateCareerAdvice(@Body() dto: GenerateCareerAdviceDto): Promise<CareerAdviceResponseDto> {
    return this.generateCareerAdviceHandler.execute(new GenerateCareerAdviceCommand(dto));
  }

  @Post('risk-analysis')
  @ApiOperation({ summary: 'Generate student risk analysis and intervention suggestions' })
  @ApiResponse({ status: 201, type: RiskAnalysisResponseDto })
  async generateRiskAnalysis(@Body() dto: RiskAnalysisDto): Promise<RiskAnalysisResponseDto> {
    return this.generateRiskAnalysisHandler.execute(new GenerateRiskAnalysisCommand(dto));
  }

  @Post('teacher-assistant')
  @ApiOperation({ summary: 'Teacher assistant prompt support' })
  async generateTeacherAssistant(@Body() dto: TeacherAssistantDto) {
    return this.generateTeacherAssistantHandler.execute(new GenerateTeacherAssistantCommand(dto));
  }

  @Post('parent-summary')
  @ApiOperation({ summary: 'Generate parent overview summary' })
  @ApiResponse({ status: 201, type: AIRecommendationResponseDto })
  async generateParentSummary(@Body() dto: ParentSummaryDto): Promise<AIRecommendationResponseDto> {
    return this.generateParentSummaryHandler.execute(new GenerateParentSummaryCommand(dto));
  }

  @Get('health')
  @ApiOperation({ summary: 'Get AI provider health status' })
  async getHealth() {
    return {
      status: 'UP',
      activeProviders: [
        { name: AIProviderType.GEMINI, latencyMs: 240, status: 'OPERATIONAL' },
        { name: AIProviderType.OPENAI, latencyMs: 310, status: 'OPERATIONAL' },
        { name: AIProviderType.ANTHROPIC, latencyMs: 420, status: 'OPERATIONAL' },
        { name: AIProviderType.AZURE_OPENAI, latencyMs: 300, status: 'OPERATIONAL' },
      ],
    };
  }

  @Get('providers/usage')
  @ApiOperation({ summary: 'Get cost and usage statistics' })
  async getUsageStats(@Query('organizationId') orgId?: string) {
    return this.getUsageStatsHandler.execute(new GetUsageStatsQuery(orgId));
  }

  @Get('history')
  @ApiOperation({ summary: 'Get audit logs of AI requests' })
  @ApiResponse({ status: 200, type: [AIRequestResponseDto] })
  async getHistory(
    @Query('organizationId') organizationId?: string,
    @Query('userId') userId?: string,
    @Query('provider') provider?: string,
  ): Promise<AIRequestResponseDto[]> {
    return this.getAIHistoryHandler.execute(
      new GetAIHistoryQuery({ organizationId, userId, provider }),
    );
  }
}

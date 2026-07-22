import { Controller, Get, Post, Body, Param, Query, HttpCode, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Auth } from '../auth/security/decorators/auth.decorator';
import { InsightTargetAudience } from './constants/growth.constants';

import { CreateGoalDto } from './application/dtos/growth-request.dto';
import {
  VedhkritIndexResponseDto,
  CareerProfileResponseDto,
  GoalResponseDto,
  GrowthInsightsResponseDto,
} from './application/dtos/growth-response.dto';

import { CalculateVedhkritIndexCommand } from './application/commands/calculate-vedhkrit-index.command';
import { GenerateCareerRecommendationsCommand } from './application/commands/generate-career-recommendations.command';
import { CreateGoalCommand } from './application/commands/create-goal.command';

import { GetVedhkritIndexQuery } from './application/queries/get-vedhkrit-index.query';
import { GetCareerProfileQuery } from './application/queries/get-career-profile.query';
import { GetGrowthInsightsQuery } from './application/queries/get-growth-insights.query';
import { ListGoalsQuery } from './application/queries/list-goals.query';

import { CalculateVedhkritIndexHandler } from './application/handlers/calculate-vedhkrit-index.handler';
import { GenerateCareerRecommendationsHandler } from './application/handlers/generate-career-recommendations.handler';
import { CreateGoalHandler } from './application/handlers/create-goal.handler';
import { GetVedhkritIndexHandler } from './application/handlers/get-vedhkrit-index.handler';
import { GetCareerProfileHandler } from './application/handlers/get-career-profile.handler';
import { GetGrowthInsightsHandler } from './application/handlers/get-growth-insights.handler';
import { ListGoalsHandler } from './application/handlers/list-goals.handler';

@ApiTags('Growth & Career Intelligence Engine')
@Controller('growth')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class GrowthController {
  constructor(
    private readonly calculateIndexHandler: CalculateVedhkritIndexHandler,
    private readonly generateCareerHandler: GenerateCareerRecommendationsHandler,
    private readonly createGoalHandler: CreateGoalHandler,
    private readonly getIndexHandler: GetVedhkritIndexHandler,
    private readonly getCareerHandler: GetCareerProfileHandler,
    private readonly getInsightsHandler: GetGrowthInsightsHandler,
    private readonly listGoalsHandler: ListGoalsHandler,
  ) {}

  @Auth()
  @Get('index/:studentId')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get Vedhkrit Index score (0-1000) & growth rate' })
  @ApiResponse({ status: 200, description: 'Vedhkrit Index summary', type: VedhkritIndexResponseDto })
  async getIndex(@Param('studentId') studentId: string): Promise<VedhkritIndexResponseDto> {
    return this.getIndexHandler.execute(new GetVedhkritIndexQuery(studentId));
  }

  @Auth()
  @Post('index/:studentId/calculate')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Trigger recalculation of Vedhkrit Index' })
  @ApiResponse({ status: 200, description: 'Vedhkrit Index recalculated', type: VedhkritIndexResponseDto })
  async calculateIndex(@Param('studentId') studentId: string): Promise<VedhkritIndexResponseDto> {
    const { result } = await this.calculateIndexHandler.execute(new CalculateVedhkritIndexCommand(studentId));
    return result;
  }

  @Auth()
  @Get('careers/:studentId')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get Career Profile, Skill Radar, & Match Scores' })
  @ApiResponse({ status: 200, description: 'Career profile summary', type: CareerProfileResponseDto })
  async getCareerProfile(@Param('studentId') studentId: string): Promise<CareerProfileResponseDto> {
    return this.getCareerHandler.execute(new GetCareerProfileQuery(studentId));
  }

  @Auth()
  @Post('careers/:studentId/recommend')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Generate fresh AI Career Recommendations & Radar metrics' })
  @ApiResponse({ status: 200, description: 'Career recommendations updated', type: CareerProfileResponseDto })
  async generateCareerRecommendations(@Param('studentId') studentId: string): Promise<CareerProfileResponseDto> {
    const { result } = await this.generateCareerHandler.execute(new GenerateCareerRecommendationsCommand(studentId));
    return result;
  }

  @Auth()
  @Get('insights/:studentId')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get AI insights for Student, Parent, Teacher, or Organization' })
  @ApiResponse({ status: 200, description: 'Multi-stakeholder AI insights', type: GrowthInsightsResponseDto })
  async getInsights(
    @Param('studentId') studentId: string,
    @Query('targetAudience') targetAudience?: InsightTargetAudience,
  ): Promise<GrowthInsightsResponseDto> {
    return this.getInsightsHandler.execute(new GetGrowthInsightsQuery(studentId, targetAudience));
  }

  @Auth()
  @Post('goals')
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create student learning goal' })
  @ApiResponse({ status: 201, description: 'Goal created', type: GoalResponseDto })
  async createGoal(@Body() dto: CreateGoalDto): Promise<GoalResponseDto> {
    return this.createGoalHandler.execute(new CreateGoalCommand(dto));
  }

  @Auth()
  @Get('goals/:studentId')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List student learning goals & progress' })
  @ApiResponse({ status: 200, description: 'List of goals' })
  async listGoals(@Param('studentId') studentId: string): Promise<GoalResponseDto[]> {
    return this.listGoalsHandler.execute(new ListGoalsQuery(studentId));
  }
}

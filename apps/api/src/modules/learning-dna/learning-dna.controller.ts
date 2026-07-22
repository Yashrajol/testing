import { Controller, Get, Post, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Auth } from '../auth/security/decorators/auth.decorator';

import { RecalculateDnaDto } from './application/dtos/learning-dna-request.dto';
import { LearningDnaResponseDto, AdaptivePathNodeResponseDto } from './application/dtos/learning-dna-response.dto';
import { RecalculateDnaCommand } from './application/commands/recalculate-dna.command';
import { GetLearningDnaQuery } from './application/queries/get-learning-dna.query';
import { GetAdaptivePathQuery } from './application/queries/get-adaptive-path.query';

import { RecalculateDnaHandler } from './application/handlers/recalculate-dna.handler';
import { GenerateAdaptivePathHandler } from './application/handlers/generate-adaptive-path.handler';
import { GetLearningDnaHandler } from './application/handlers/get-learning-dna.handler';
import { GetAdaptivePathHandler } from './application/handlers/get-adaptive-path.handler';

@ApiTags('Learning DNA Engine')
@Controller('learning-dna')
export class LearningDnaController {
  constructor(
    private readonly recalculateDnaHandler: RecalculateDnaHandler,
    private readonly generateAdaptivePathHandler: GenerateAdaptivePathHandler,
    private readonly getLearningDnaHandler: GetLearningDnaHandler,
    private readonly getAdaptivePathHandler: GetAdaptivePathHandler,
  ) {}

  @Auth()
  @Post('generate')
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Generate initial Learning DNA for a student' })
  @ApiResponse({ status: 201, description: 'Learning DNA generated', type: LearningDnaResponseDto })
  async generate(@Body() dto: RecalculateDnaDto): Promise<LearningDnaResponseDto> {
    return this.recalculateDnaHandler.execute(new RecalculateDnaCommand(dto.studentId));
  }

  @Auth()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Refresh student Learning DNA metrics' })
  @ApiResponse({ status: 200, description: 'Learning DNA refreshed', type: LearningDnaResponseDto })
  async refresh(@Body() dto: RecalculateDnaDto): Promise<LearningDnaResponseDto> {
    return this.recalculateDnaHandler.execute(new RecalculateDnaCommand(dto.studentId));
  }

  @Auth()
  @Get('student/:studentId')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get Student DNA profile' })
  @ApiResponse({ status: 200, description: 'Student DNA profile', type: LearningDnaResponseDto })
  async getStudentDna(@Param('studentId') studentId: string): Promise<LearningDnaResponseDto> {
    return this.getLearningDnaHandler.execute(new GetLearningDnaQuery(studentId));
  }

  @Auth()
  @Get('knowledge/:studentId')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get student Knowledge Profile' })
  @ApiResponse({ status: 200, description: 'Knowledge profile summary' })
  async getKnowledgeProfile(@Param('studentId') studentId: string): Promise<any> {
    const dna = await this.getLearningDnaHandler.execute(new GetLearningDnaQuery(studentId));
    return dna.knowledgeGraph;
  }

  @Auth()
  @Get('competency/:studentId')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get student Competency Profile & Gap Analysis' })
  @ApiResponse({ status: 200, description: 'Competency profile summary' })
  async getCompetencyProfile(@Param('studentId') studentId: string): Promise<any> {
    const dna = await this.getLearningDnaHandler.execute(new GetLearningDnaQuery(studentId));
    return dna.competencyProfile;
  }

  @Auth()
  @Get('recommendations/:studentId')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get AI Recommendations for student' })
  @ApiResponse({ status: 200, description: 'Recommendations list' })
  async getRecommendations(@Param('studentId') studentId: string): Promise<any> {
    const dna = await this.getLearningDnaHandler.execute(new GetLearningDnaQuery(studentId));
    return dna.recommendations;
  }

  @Auth()
  @Get('risk/:studentId')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get Risk Analysis & Prediction' })
  @ApiResponse({ status: 200, description: 'Risk analysis summary' })
  async getRiskAnalysis(@Param('studentId') studentId: string): Promise<any> {
    const dna = await this.getLearningDnaHandler.execute(new GetLearningDnaQuery(studentId));
    return {
      riskScore: dna.riskScore,
      riskLevel: dna.riskScore >= 50 ? 'HIGH' : dna.riskScore >= 20 ? 'MEDIUM' : 'LOW',
    };
  }

  @Auth()
  @Get('pattern/:studentId')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get Learning Pattern Analysis' })
  @ApiResponse({ status: 200, description: 'Learning pattern analysis' })
  async getLearningPattern(@Param('studentId') studentId: string): Promise<any> {
    const dna = await this.getLearningDnaHandler.execute(new GetLearningDnaQuery(studentId));
    return {
      primaryStyle: dna.primaryLearningStyle,
      preferredMode: dna.preferredMode,
    };
  }

  @Auth()
  @Get('mastery/:studentId')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get Mastery Report' })
  @ApiResponse({ status: 200, description: 'Mastery report summary' })
  async getMasteryReport(@Param('studentId') studentId: string): Promise<any> {
    const dna = await this.getLearningDnaHandler.execute(new GetLearningDnaQuery(studentId));
    return {
      masteryScore: dna.masteryScore,
      growthScore: dna.growthScore,
      retentionScore: dna.retentionScore,
      confidenceScore: dna.confidenceScore,
    };
  }
}

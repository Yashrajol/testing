import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Auth } from '../auth/security/decorators/auth.decorator';
import { CurrentUser } from '../auth/security/decorators/current-user.decorator';
import { AuthenticatedUser } from '../auth/security/interfaces/authenticated-user.interface';
import { AssessmentType } from './constants/assessment.constants';

import {
  CreateAssessmentDto,
  SubmitAnswerDto,
  EvaluateAttemptDto,
} from './application/dtos/assessment-request.dto';
import {
  AssessmentResponseDto,
  AssessmentAttemptResponseDto,
} from './application/dtos/assessment-response.dto';

import { CreateAssessmentCommand } from './application/commands/create-assessment.command';
import { StartAttemptCommand } from './application/commands/start-attempt.command';
import { SubmitAnswerCommand } from './application/commands/submit-answer.command';
import { FinalizeAttemptCommand } from './application/commands/finalize-attempt.command';
import { EvaluateAttemptCommand } from './application/commands/evaluate-attempt.command';

import { GetAssessmentQuery } from './application/queries/get-assessment.query';
import { ListAssessmentsQuery } from './application/queries/list-assessments.query';

import { CreateAssessmentHandler } from './application/handlers/create-assessment.handler';
import { StartAttemptHandler } from './application/handlers/start-attempt.handler';
import { SubmitAnswerHandler } from './application/handlers/submit-answer.handler';
import { FinalizeAttemptHandler } from './application/handlers/finalize-attempt.handler';
import { EvaluateAttemptHandler } from './application/handlers/evaluate-attempt.handler';
import { GetAssessmentHandler } from './application/handlers/get-assessment.handler';
import { ListAssessmentsHandler } from './application/handlers/list-assessments.handler';

@ApiTags('Assessment Engine')
@Controller('assessments')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class AssessmentController {
  constructor(
    private readonly createAssessmentHandler: CreateAssessmentHandler,
    private readonly startAttemptHandler: StartAttemptHandler,
    private readonly submitAnswerHandler: SubmitAnswerHandler,
    private readonly finalizeAttemptHandler: FinalizeAttemptHandler,
    private readonly evaluateAttemptHandler: EvaluateAttemptHandler,
    private readonly getAssessmentHandler: GetAssessmentHandler,
    private readonly listAssessmentsHandler: ListAssessmentsHandler,
  ) {}

  @Auth()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create Assessment (Quiz, Practice Test, Exam, Assignment)' })
  @ApiResponse({ status: 201, description: 'Assessment created successfully', type: AssessmentResponseDto })
  async create(@Body() dto: CreateAssessmentDto): Promise<AssessmentResponseDto> {
    return this.createAssessmentHandler.execute(new CreateAssessmentCommand(dto));
  }

  @Auth()
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List Assessments with filters' })
  @ApiResponse({ status: 200, description: 'Paginated assessments list' })
  async list(
    @Query('type') type?: AssessmentType,
    @Query('search') search?: string,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ): Promise<{ items: AssessmentResponseDto[]; total: number }> {
    return this.listAssessmentsHandler.execute(
      new ListAssessmentsQuery({
        type,
        search,
        skip: skip ? Number(skip) : 0,
        take: take ? Number(take) : 20,
      }),
    );
  }

  @Auth()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get Assessment details by ID' })
  @ApiResponse({ status: 200, description: 'Assessment details', type: AssessmentResponseDto })
  async getOne(@Param('id') id: string): Promise<AssessmentResponseDto> {
    return this.getAssessmentHandler.execute(new GetAssessmentQuery(id));
  }

  @Auth()
  @Post(':id/attempts')
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Start a timed assessment attempt for logged in student' })
  @ApiResponse({ status: 201, description: 'Attempt started', type: AssessmentAttemptResponseDto })
  async startAttempt(
    @Param('id') id: string,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<AssessmentAttemptResponseDto> {
    const { result } = await this.startAttemptHandler.execute(new StartAttemptCommand(id, user.id));
    return result;
  }

  @Auth()
  @Post('attempts/:attemptId/answers')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Submit or auto-save answer for a question in an attempt' })
  @ApiResponse({ status: 200, description: 'Answer saved' })
  async submitAnswer(
    @Param('attemptId') attemptId: string,
    @Body() dto: SubmitAnswerDto,
  ): Promise<{ answerId: string; autoEvaluated: boolean; isCorrect?: boolean }> {
    return this.submitAnswerHandler.execute(new SubmitAnswerCommand(attemptId, dto));
  }

  @Auth()
  @Post('attempts/:attemptId/finalize')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Finalize and submit assessment attempt for scoring' })
  @ApiResponse({ status: 200, description: 'Attempt finalized', type: AssessmentAttemptResponseDto })
  async finalizeAttempt(
    @Param('attemptId') attemptId: string,
  ): Promise<AssessmentAttemptResponseDto> {
    const { result } = await this.finalizeAttemptHandler.execute(new FinalizeAttemptCommand(attemptId));
    return result;
  }

  @Auth()
  @Post('attempts/:attemptId/evaluate')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Evaluate open-ended answers and grant grades with rubrics' })
  @ApiResponse({ status: 200, description: 'Attempt evaluated', type: AssessmentAttemptResponseDto })
  async evaluateAttempt(
    @Param('attemptId') attemptId: string,
    @Body() dto: EvaluateAttemptDto,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<AssessmentAttemptResponseDto> {
    const { result } = await this.evaluateAttemptHandler.execute(
      new EvaluateAttemptCommand(attemptId, dto, user.id),
    );
    return result;
  }
}

import {
  Controller,
  Post,
  Get,
  Put,
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
import { AssignmentStatus, SubmissionStatus } from './constants/assignment.constants';

import {
  CreateAssignmentDto,
  SubmitAssignmentDto,
  EvaluateSubmissionDto,
  GrantExtensionDto,
} from './application/dtos/assignment-request.dto';
import {
  AssignmentResponseDto,
  SubmissionResponseDto,
  ExtensionResponseDto,
} from './application/dtos/assignment-response.dto';

import { CreateAssignmentCommand } from './application/commands/create-assignment.command';
import { PublishAssignmentCommand } from './application/commands/publish-assignment.command';
import { SubmitAssignmentCommand } from './application/commands/submit-assignment.command';
import { EvaluateSubmissionCommand } from './application/commands/evaluate-submission.command';
import { ReopenSubmissionCommand } from './application/commands/reopen-submission.command';
import { GrantExtensionCommand } from './application/commands/grant-extension.command';

import { GetAssignmentQuery } from './application/queries/get-assignment.query';
import { ListAssignmentsQuery } from './application/queries/list-assignments.query';
import { ListSubmissionsQuery } from './application/queries/list-submissions.query';

import { CreateAssignmentHandler } from './application/handlers/create-assignment.handler';
import { PublishAssignmentHandler } from './application/handlers/publish-assignment.handler';
import { SubmitAssignmentHandler } from './application/handlers/submit-assignment.handler';
import { EvaluateSubmissionHandler } from './application/handlers/evaluate-submission.handler';
import { ReopenSubmissionHandler } from './application/handlers/reopen-submission.handler';
import { GrantExtensionHandler } from './application/handlers/grant-extension.handler';
import { GetAssignmentHandler } from './application/handlers/get-assignment.handler';
import { ListAssignmentsHandler } from './application/handlers/list-assignments.handler';
import { ListSubmissionsHandler } from './application/handlers/list-submissions.handler';

@ApiTags('Assignment Engine')
@Controller('assignments')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class AssignmentController {
  constructor(
    private readonly createAssignmentHandler: CreateAssignmentHandler,
    private readonly publishAssignmentHandler: PublishAssignmentHandler,
    private readonly submitAssignmentHandler: SubmitAssignmentHandler,
    private readonly evaluateSubmissionHandler: EvaluateSubmissionHandler,
    private readonly reopenSubmissionHandler: ReopenSubmissionHandler,
    private readonly grantExtensionHandler: GrantExtensionHandler,
    private readonly getAssignmentHandler: GetAssignmentHandler,
    private readonly listAssignmentsHandler: ListAssignmentsHandler,
    private readonly listSubmissionsHandler: ListSubmissionsHandler,
  ) {}

  @Auth()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create assignment draft with rubrics' })
  @ApiResponse({ status: 201, description: 'Assignment draft created', type: AssignmentResponseDto })
  async create(@Body() dto: CreateAssignmentDto): Promise<AssignmentResponseDto> {
    return this.createAssignmentHandler.execute(new CreateAssignmentCommand(dto));
  }

  @Auth()
  @Post(':id/publish')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Publish assignment to batch' })
  @ApiResponse({ status: 200, description: 'Assignment published', type: AssignmentResponseDto })
  async publish(@Param('id') id: string): Promise<AssignmentResponseDto> {
    const { result } = await this.publishAssignmentHandler.execute(new PublishAssignmentCommand(id));
    return result;
  }

  @Auth()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get assignment details by ID' })
  @ApiResponse({ status: 200, description: 'Assignment details', type: AssignmentResponseDto })
  async getById(@Param('id') id: string): Promise<AssignmentResponseDto> {
    return this.getAssignmentHandler.execute(new GetAssignmentQuery(id));
  }

  @Auth()
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List assignments by batch and status' })
  @ApiResponse({ status: 200, description: 'Paginated assignments list' })
  async list(
    @Query('batchId') batchId?: string,
    @Query('status') status?: AssignmentStatus,
    @Query('search') search?: string,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ): Promise<{ items: AssignmentResponseDto[]; total: number }> {
    return this.listAssignmentsHandler.execute(
      new ListAssignmentsQuery({
        batchId,
        status,
        search,
        skip: skip ? Number(skip) : 0,
        take: take ? Number(take) : 20,
      }),
    );
  }

  @Auth()
  @Post('submissions')
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Submit student assignment response' })
  @ApiResponse({ status: 201, description: 'Submission saved', type: SubmissionResponseDto })
  async submit(@Body() dto: SubmitAssignmentDto): Promise<SubmissionResponseDto> {
    const { result } = await this.submitAssignmentHandler.execute(new SubmitAssignmentCommand(dto));
    return result;
  }

  @Auth()
  @Get('submissions/list')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List submissions for grading' })
  @ApiResponse({ status: 200, description: 'Paginated submissions list' })
  async listSubmissions(
    @Query('assignmentId') assignmentId?: string,
    @Query('studentId') studentId?: string,
    @Query('status') status?: SubmissionStatus,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ): Promise<{ items: SubmissionResponseDto[]; total: number }> {
    return this.listSubmissionsHandler.execute(
      new ListSubmissionsQuery({
        assignmentId,
        studentId,
        status,
        skip: skip ? Number(skip) : 0,
        take: take ? Number(take) : 20,
      }),
    );
  }

  @Auth()
  @Put('submissions/:id/evaluate')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Evaluate submission with score & teacher feedback' })
  @ApiResponse({ status: 200, description: 'Submission evaluated', type: SubmissionResponseDto })
  async evaluate(
    @Param('id') id: string,
    @Body() dto: EvaluateSubmissionDto,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<SubmissionResponseDto> {
    const { result } = await this.evaluateSubmissionHandler.execute(
      new EvaluateSubmissionCommand(id, dto, user.id),
    );
    return result;
  }

  @Auth()
  @Put('submissions/:id/reopen')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Reopen submission for student resubmission' })
  @ApiResponse({ status: 200, description: 'Submission reopened', type: SubmissionResponseDto })
  async reopen(
    @Param('id') id: string,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<SubmissionResponseDto> {
    const { result } = await this.reopenSubmissionHandler.execute(new ReopenSubmissionCommand(id, user.id));
    return result;
  }

  @Auth()
  @Post('extensions')
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Grant deadline extension for a student' })
  @ApiResponse({ status: 201, description: 'Extension granted', type: ExtensionResponseDto })
  async grantExtension(
    @Body() dto: GrantExtensionDto,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<ExtensionResponseDto> {
    return this.grantExtensionHandler.execute(new GrantExtensionCommand(dto, user.id));
  }
}

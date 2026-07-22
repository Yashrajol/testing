import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreateAssignmentDto, UpdateAssignmentDto, CloneAssignmentDto } from './application/dtos/assignment-request.dto';
import { SubmitAssignmentDto, SaveDraftSubmissionDto, ResubmitAssignmentDto, AttachmentDto } from './application/dtos/submission-request.dto';
import { GradeSubmissionDto, AddFeedbackDto, ReturnSubmissionDto, ReopenSubmissionDto } from './application/dtos/evaluation-dto';
import { AssignmentResponseDto, SubmissionResponseDto, FeedbackResponseDto, AttachmentResponseDto } from './application/dtos/assignment-response.dto';
import { AssignmentDashboardResponseDto, PendingAssignmentDto, OverdueAssignmentDto, CompletionReportResponseDto, PerformanceReportResponseDto } from './application/dtos/analytics-dto';
import { CreateAssignmentHandler } from './application/handlers/create-assignment.handler';
import { UpdateAssignmentHandler } from './application/handlers/update-assignment.handler';
import { DeleteAssignmentHandler } from './application/handlers/delete-assignment.handler';
import { PublishAssignmentHandler } from './application/handlers/publish-assignment.handler';
import { CloneAssignmentHandler } from './application/handlers/clone-assignment.handler';
import { ArchiveAssignmentHandler } from './application/handlers/archive-assignment.handler';
import { SubmitAssignmentHandler } from './application/handlers/submit-assignment.handler';
import { SaveDraftSubmissionHandler } from './application/handlers/save-draft-submission.handler';
import { ResubmitAssignmentHandler } from './application/handlers/resubmit-assignment.handler';
import { GradeSubmissionHandler } from './application/handlers/grade-submission.handler';
import { AddFeedbackHandler } from './application/handlers/add-feedback.handler';
import { ReturnSubmissionHandler } from './application/handlers/return-submission.handler';
import { ReopenSubmissionHandler } from './application/handlers/reopen-submission.handler';
import { GetAssignmentHandler } from './application/handlers/get-assignment.handler';
import { GetSubmissionsHandler } from './application/handlers/get-submissions.handler';
import { GetStudentSubmissionHandler } from './application/handlers/get-student-submission.handler';
import { GetAssignmentDashboardHandler } from './application/handlers/get-assignment-dashboard.handler';
import { GetPendingAssignmentsHandler } from './application/handlers/get-pending-assignments.handler';
import { GetOverdueAssignmentsHandler } from './application/handlers/get-overdue-assignments.handler';
import { GetCompletionReportHandler } from './application/handlers/get-completion-report.handler';
import { GetPerformanceReportHandler } from './application/handlers/get-performance-report.handler';
import { CreateAssignmentCommand } from './application/commands/create-assignment.command';
import { UpdateAssignmentCommand } from './application/commands/update-assignment.command';
import { DeleteAssignmentCommand } from './application/commands/delete-assignment.command';
import { PublishAssignmentCommand } from './application/commands/publish-assignment.command';
import { CloneAssignmentCommand } from './application/commands/clone-assignment.command';
import { ArchiveAssignmentCommand } from './application/commands/archive-assignment.command';
import { SubmitAssignmentCommand } from './application/commands/submit-assignment.command';
import { SaveDraftSubmissionCommand } from './application/commands/save-draft-submission.command';
import { ResubmitAssignmentCommand } from './application/commands/resubmit-assignment.command';
import { GradeSubmissionCommand } from './application/commands/grade-submission.command';
import { AddFeedbackCommand } from './application/commands/add-feedback.command';
import { ReturnSubmissionCommand } from './application/commands/return-submission.command';
import { ReopenSubmissionCommand } from './application/commands/reopen-submission.command';
import { GetAssignmentQuery } from './application/queries/get-assignment.query';
import { GetSubmissionsQuery } from './application/queries/get-submissions.query';
import { GetStudentSubmissionQuery } from './application/queries/get-student-submission.query';
import { GetAssignmentDashboardQuery } from './application/queries/get-assignment-dashboard.query';
import { GetPendingAssignmentsQuery } from './application/queries/get-pending-assignments.query';
import { GetOverdueAssignmentsQuery } from './application/queries/get-overdue-assignments.query';
import { GetCompletionReportQuery } from './application/queries/get-completion-report.query';
import { GetPerformanceReportQuery } from './application/queries/get-performance-report.query';

@ApiTags('Assignments & Coursework Engine')
@Controller('assignments')
export class AssignmentsController {
  constructor(
    private readonly createAssignmentHandler: CreateAssignmentHandler,
    private readonly updateAssignmentHandler: UpdateAssignmentHandler,
    private readonly deleteAssignmentHandler: DeleteAssignmentHandler,
    private readonly publishAssignmentHandler: PublishAssignmentHandler,
    private readonly cloneAssignmentHandler: CloneAssignmentHandler,
    private readonly archiveAssignmentHandler: ArchiveAssignmentHandler,
    private readonly submitAssignmentHandler: SubmitAssignmentHandler,
    private readonly saveDraftSubmissionHandler: SaveDraftSubmissionHandler,
    private readonly resubmitAssignmentHandler: ResubmitAssignmentHandler,
    private readonly gradeSubmissionHandler: GradeSubmissionHandler,
    private readonly addFeedbackHandler: AddFeedbackHandler,
    private readonly returnSubmissionHandler: ReturnSubmissionHandler,
    private readonly reopenSubmissionHandler: ReopenSubmissionHandler,
    private readonly getAssignmentHandler: GetAssignmentHandler,
    private readonly getSubmissionsHandler: GetSubmissionsHandler,
    private readonly getStudentSubmissionHandler: GetStudentSubmissionHandler,
    private readonly getAssignmentDashboardHandler: GetAssignmentDashboardHandler,
    private readonly getPendingAssignmentsHandler: GetPendingAssignmentsHandler,
    private readonly getOverdueAssignmentsHandler: GetOverdueAssignmentsHandler,
    private readonly getCompletionReportHandler: GetCompletionReportHandler,
    private readonly getPerformanceReportHandler: GetPerformanceReportHandler,
  ) {}

  // --- ASSIGNMENTS ---

  @Post()
  @ApiOperation({ summary: 'Create a new assignment or coursework project' })
  @ApiResponse({ status: 201, type: AssignmentResponseDto })
  async createAssignment(@Body() dto: CreateAssignmentDto): Promise<AssignmentResponseDto> {
    return this.createAssignmentHandler.execute(new CreateAssignmentCommand(dto));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get assignment details by ID' })
  @ApiResponse({ status: 200, type: AssignmentResponseDto })
  async getAssignment(@Param('id') id: string): Promise<AssignmentResponseDto> {
    return this.getAssignmentHandler.execute(new GetAssignmentQuery(id));
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update assignment parameters' })
  @ApiResponse({ status: 200, type: AssignmentResponseDto })
  async updateAssignment(@Param('id') id: string, @Body() dto: UpdateAssignmentDto): Promise<AssignmentResponseDto> {
    return this.updateAssignmentHandler.execute(new UpdateAssignmentCommand(id, dto));
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete an assignment' })
  async deleteAssignment(@Param('id') id: string) {
    return this.deleteAssignmentHandler.execute(new DeleteAssignmentCommand(id));
  }

  @Post(':id/publish')
  @ApiOperation({ summary: 'Publish an assignment for student access' })
  @ApiResponse({ status: 200, type: AssignmentResponseDto })
  async publishAssignment(@Param('id') id: string): Promise<AssignmentResponseDto> {
    return this.publishAssignmentHandler.execute(new PublishAssignmentCommand(id));
  }

  @Post(':id/clone')
  @ApiOperation({ summary: 'Clone an assignment to another batch' })
  @ApiResponse({ status: 201, type: AssignmentResponseDto })
  async cloneAssignment(@Param('id') id: string, @Body() dto: CloneAssignmentDto): Promise<AssignmentResponseDto> {
    return this.cloneAssignmentHandler.execute(new CloneAssignmentCommand(id, dto));
  }

  @Post(':id/archive')
  @ApiOperation({ summary: 'Archive an assignment' })
  @ApiResponse({ status: 200, type: AssignmentResponseDto })
  async archiveAssignment(@Param('id') id: string): Promise<AssignmentResponseDto> {
    return this.archiveAssignmentHandler.execute(new ArchiveAssignmentCommand(id));
  }

  // --- SUBMISSIONS ---

  @Post('submissions')
  @ApiOperation({ summary: 'Submit an assignment attempt' })
  @ApiResponse({ status: 201, type: SubmissionResponseDto })
  async submitAssignment(@Body() dto: SubmitAssignmentDto): Promise<SubmissionResponseDto> {
    return this.submitAssignmentHandler.execute(new SubmitAssignmentCommand(dto));
  }

  @Post('submissions/draft')
  @ApiOperation({ summary: 'Save draft submission' })
  @ApiResponse({ status: 201, type: SubmissionResponseDto })
  async saveDraft(@Body() dto: SaveDraftSubmissionDto): Promise<SubmissionResponseDto> {
    return this.saveDraftSubmissionHandler.execute(new SaveDraftSubmissionCommand(dto));
  }

  @Post('submissions/resubmit')
  @ApiOperation({ summary: 'Resubmit an assignment' })
  @ApiResponse({ status: 200, type: SubmissionResponseDto })
  async resubmit(@Body() dto: ResubmitAssignmentDto): Promise<SubmissionResponseDto> {
    return this.resubmitAssignmentHandler.execute(new ResubmitAssignmentCommand(dto));
  }

  @Get('submissions/:id')
  @ApiOperation({ summary: 'Get submission details by ID' })
  @ApiResponse({ status: 200, type: SubmissionResponseDto })
  async getSubmission(@Param('id') id: string): Promise<SubmissionResponseDto> {
    const subs = await this.getSubmissionsHandler.execute(new GetSubmissionsQuery({ skip: 0, take: 1 }));
    return subs[0];
  }

  @Get(':id/submissions/student/:studentId')
  @ApiOperation({ summary: 'Get student submission for an assignment' })
  @ApiResponse({ status: 200, type: SubmissionResponseDto })
  async getStudentSubmission(
    @Param('id') assignmentId: string,
    @Param('studentId') studentId: string,
  ): Promise<SubmissionResponseDto> {
    return this.getStudentSubmissionHandler.execute(new GetStudentSubmissionQuery(assignmentId, studentId));
  }

  // --- EVALUATION ---

  @Post('submissions/:id/grade')
  @ApiOperation({ summary: 'Grade a submission with score and rubric feedback' })
  @ApiResponse({ status: 200, type: SubmissionResponseDto })
  async gradeSubmission(
    @Param('id') submissionId: string,
    @Body() dto: GradeSubmissionDto,
    @Query('gradedById') gradedById: string = 'TEACHER_ID',
  ): Promise<SubmissionResponseDto> {
    return this.gradeSubmissionHandler.execute(new GradeSubmissionCommand(submissionId, dto, gradedById));
  }

  @Post('submissions/:id/feedback')
  @ApiOperation({ summary: 'Add teacher/peer/AI feedback' })
  @ApiResponse({ status: 201, type: FeedbackResponseDto })
  async addFeedback(
    @Param('id') submissionId: string,
    @Body() dto: AddFeedbackDto,
    @Query('authorId') authorId: string = 'TEACHER_ID',
  ): Promise<FeedbackResponseDto> {
    return this.addFeedbackHandler.execute(new AddFeedbackCommand(submissionId, dto, authorId));
  }

  @Post('submissions/:id/return')
  @ApiOperation({ summary: 'Return submission to student for edits' })
  @ApiResponse({ status: 200, type: SubmissionResponseDto })
  async returnSubmission(
    @Param('id') submissionId: string,
    @Body() dto: ReturnSubmissionDto,
    @Query('returnedById') returnedById: string = 'TEACHER_ID',
  ): Promise<SubmissionResponseDto> {
    return this.returnSubmissionHandler.execute(new ReturnSubmissionCommand(submissionId, returnedById, dto));
  }

  @Post('submissions/:id/reopen')
  @ApiOperation({ summary: 'Reopen submission attempt' })
  @ApiResponse({ status: 200, type: SubmissionResponseDto })
  async reopenSubmission(
    @Param('id') submissionId: string,
    @Body() dto: ReopenSubmissionDto,
    @Query('reopenedById') reopenedById: string = 'TEACHER_ID',
  ): Promise<SubmissionResponseDto> {
    return this.reopenSubmissionHandler.execute(new ReopenSubmissionCommand(submissionId, reopenedById, dto));
  }

  // --- ANALYTICS ---

  @Get('analytics/dashboard')
  @ApiOperation({ summary: 'Get assignment analytics dashboard summary' })
  @ApiResponse({ status: 200, type: AssignmentDashboardResponseDto })
  async getDashboard(
    @Query('organizationId') organizationId?: string,
    @Query('batchId') batchId?: string,
  ): Promise<AssignmentDashboardResponseDto> {
    return this.getAssignmentDashboardHandler.execute(new GetAssignmentDashboardQuery(organizationId, batchId));
  }

  @Get('analytics/pending/:studentId')
  @ApiOperation({ summary: 'Get pending active assignments for a student' })
  @ApiResponse({ status: 200, type: [PendingAssignmentDto] })
  async getPendingAssignments(@Param('studentId') studentId: string): Promise<PendingAssignmentDto[]> {
    return this.getPendingAssignmentsHandler.execute(new GetPendingAssignmentsQuery(studentId));
  }

  @Get('analytics/overdue/:studentId')
  @ApiOperation({ summary: 'Get overdue assignments for a student' })
  @ApiResponse({ status: 200, type: [OverdueAssignmentDto] })
  async getOverdueAssignments(@Param('studentId') studentId: string): Promise<OverdueAssignmentDto[]> {
    return this.getOverdueAssignmentsHandler.execute(new GetOverdueAssignmentsQuery(studentId));
  }

  @Get('analytics/completion-report/:batchId')
  @ApiOperation({ summary: 'Get batch assignment completion report' })
  @ApiResponse({ status: 200, type: CompletionReportResponseDto })
  async getCompletionReport(@Param('batchId') batchId: string): Promise<CompletionReportResponseDto> {
    return this.getCompletionReportHandler.execute(new GetCompletionReportQuery(batchId));
  }

  @Get('analytics/performance-report/:batchId')
  @ApiOperation({ summary: 'Get batch performance report & weakness analysis' })
  @ApiResponse({ status: 200, type: PerformanceReportResponseDto })
  async getPerformanceReport(@Param('batchId') batchId: string): Promise<PerformanceReportResponseDto> {
    return this.getPerformanceReportHandler.execute(new GetPerformanceReportQuery(batchId));
  }
}

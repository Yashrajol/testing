import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { Auth } from '../auth/security/decorators/auth.decorator';
import { CurrentUser } from '../auth/security/decorators/current-user.decorator';
import { AuthenticatedUser } from '../auth/security/interfaces/authenticated-user.interface';
import { AttendanceStatus, AttendanceMode } from './constants/attendance.constants';

import {
  CreateSessionDto,
  MarkAttendanceDto,
  BulkAttendanceDto,
  CorrectAttendanceDto,
} from './application/dtos/attendance-request.dto';
import {
  ApplyLeaveDto,
  RejectLeaveDto,
  CancelLeaveDto,
} from './application/dtos/leave-dto';
import {
  CreateHolidayDto,
  UpdateHolidayDto,
} from './application/dtos/holiday-dto';
import {
  AttendanceRecordResponseDto,
  AttendanceSessionResponseDto,
  LeaveRequestResponseDto,
  HolidayResponseDto,
  AttendanceSummaryResponseDto,
} from './application/dtos/attendance-response.dto';
import {
  AttendanceDashboardResponseDto,
  DefaulterReportResponseDto,
  AttendanceHeatmapResponseDto,
} from './application/dtos/analytics-dto';

// Commands & Handlers
import { CreateSessionCommand } from './application/commands/create-session.command';
import { MarkAttendanceCommand } from './application/commands/mark-attendance.command';
import { BulkAttendanceCommand } from './application/commands/bulk-attendance.command';
import { CorrectAttendanceCommand } from './application/commands/correct-attendance.command';
import { CloseSessionCommand } from './application/commands/close-session.command';
import { ApplyLeaveCommand } from './application/commands/apply-leave.command';
import { ApproveLeaveCommand } from './application/commands/approve-leave.command';
import { RejectLeaveCommand } from './application/commands/reject-leave.command';
import { CancelLeaveCommand } from './application/commands/cancel-leave.command';
import { CreateHolidayCommand } from './application/commands/create-holiday.command';
import { UpdateHolidayCommand } from './application/commands/update-holiday.command';
import { DeleteHolidayCommand } from './application/commands/delete-holiday.command';

import { CreateSessionHandler } from './application/handlers/create-session.handler';
import { MarkAttendanceHandler } from './application/handlers/mark-attendance.handler';
import { BulkAttendanceHandler } from './application/handlers/bulk-attendance.handler';
import { CorrectAttendanceHandler } from './application/handlers/correct-attendance.handler';
import { CloseSessionHandler } from './application/handlers/close-session.handler';
import { ApplyLeaveHandler } from './application/handlers/apply-leave.handler';
import { ApproveLeaveHandler } from './application/handlers/approve-leave.handler';
import { RejectLeaveHandler } from './application/handlers/reject-leave.handler';
import { CancelLeaveHandler } from './application/handlers/cancel-leave.handler';
import { CreateHolidayHandler } from './application/handlers/create-holiday.handler';
import { UpdateHolidayHandler } from './application/handlers/update-holiday.handler';
import { DeleteHolidayHandler } from './application/handlers/delete-holiday.handler';

// Queries & Handlers
import { GetAttendanceQuery } from './application/queries/get-attendance.query';
import { GetAttendanceHistoryQuery } from './application/queries/get-attendance-history.query';
import { GetStudentAttendanceQuery } from './application/queries/get-student-attendance.query';
import { GetClassAttendanceQuery } from './application/queries/get-class-attendance.query';
import { GetDailyAttendanceQuery } from './application/queries/get-daily-attendance.query';
import { GetAttendanceSummaryQuery } from './application/queries/get-attendance-summary.query';
import { GetAcademicCalendarQuery } from './application/queries/get-academic-calendar.query';
import { GetAttendanceDashboardQuery } from './application/queries/get-attendance-dashboard.query';
import { GetDefaultersReportQuery } from './application/queries/get-defaulters-report.query';
import { GetMonthlyReportQuery } from './application/queries/get-monthly-report.query';
import { GetAttendanceHeatmapQuery } from './application/queries/get-attendance-heatmap.query';

import { GetAttendanceHandler } from './application/handlers/get-attendance.handler';
import { GetAttendanceHistoryHandler } from './application/handlers/get-attendance-history.handler';
import { GetStudentAttendanceHandler } from './application/handlers/get-student-attendance.handler';
import { GetClassAttendanceHandler } from './application/handlers/get-class-attendance.handler';
import { GetDailyAttendanceHandler } from './application/handlers/get-daily-attendance.handler';
import { GetAttendanceSummaryHandler } from './application/handlers/get-attendance-summary.handler';
import { GetAcademicCalendarHandler } from './application/handlers/get-academic-calendar.handler';
import { GetAttendanceDashboardHandler } from './application/handlers/get-attendance-dashboard.handler';
import { GetDefaultersReportHandler } from './application/handlers/get-defaulters-report.handler';
import { GetMonthlyReportHandler } from './application/handlers/get-monthly-report.handler';
import { GetAttendanceHeatmapHandler } from './application/handlers/get-attendance-heatmap.handler';

@ApiTags('Attendance Engine')
@Controller('attendance')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class AttendanceController {
  constructor(
    private readonly createSessionHandler: CreateSessionHandler,
    private readonly markAttendanceHandler: MarkAttendanceHandler,
    private readonly bulkAttendanceHandler: BulkAttendanceHandler,
    private readonly correctAttendanceHandler: CorrectAttendanceHandler,
    private readonly closeSessionHandler: CloseSessionHandler,
    private readonly applyLeaveHandler: ApplyLeaveHandler,
    private readonly approveLeaveHandler: ApproveLeaveHandler,
    private readonly rejectLeaveHandler: RejectLeaveHandler,
    private readonly cancelLeaveHandler: CancelLeaveHandler,
    private readonly createHolidayHandler: CreateHolidayHandler,
    private readonly updateHolidayHandler: UpdateHolidayHandler,
    private readonly deleteHolidayHandler: DeleteHolidayHandler,
    private readonly getAttendanceHandler: GetAttendanceHandler,
    private readonly getHistoryHandler: GetAttendanceHistoryHandler,
    private readonly getStudentAttendanceHandler: GetStudentAttendanceHandler,
    private readonly getClassAttendanceHandler: GetClassAttendanceHandler,
    private readonly getDailyHandler: GetDailyAttendanceHandler,
    private readonly getSummaryHandler: GetAttendanceSummaryHandler,
    private readonly getAcademicCalendarHandler: GetAcademicCalendarHandler,
    private readonly getDashboardHandler: GetAttendanceDashboardHandler,
    private readonly getDefaultersHandler: GetDefaultersReportHandler,
    private readonly getMonthlyReportHandler: GetMonthlyReportHandler,
    private readonly getHeatmapHandler: GetAttendanceHeatmapHandler,
  ) {}

  // ==================== ATTENDANCE ENDPOINTS ====================

  @Auth()
  @Post('sessions')
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new attendance session (Daily, Lecture, Subject-wise, Class)' })
  @ApiResponse({ status: 201, description: 'Attendance session created', type: AttendanceSessionResponseDto })
  async createSession(
    @Body() dto: CreateSessionDto,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<AttendanceSessionResponseDto> {
    return this.createSessionHandler.execute(new CreateSessionCommand(dto, user?.id));
  }

  @Auth()
  @Post('records')
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mark attendance (Manual, QR Code, Geofence, Biometric)' })
  @ApiResponse({ status: 201, description: 'Attendance marked', type: AttendanceRecordResponseDto })
  async markRecord(
    @Body() dto: MarkAttendanceDto,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<AttendanceRecordResponseDto> {
    const { result } = await this.markAttendanceHandler.execute(new MarkAttendanceCommand(dto, user?.id));
    return result;
  }

  @Auth()
  @Post('records/bulk')
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Bulk mark student attendance for a batch/class' })
  @ApiResponse({ status: 201, description: 'Bulk attendance records saved' })
  async markBulk(
    @Body() dto: BulkAttendanceDto,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<AttendanceRecordResponseDto[]> {
    return this.bulkAttendanceHandler.execute(new BulkAttendanceCommand(dto, user?.id));
  }

  @Auth()
  @Put('records/:id/correct')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Correct existing attendance record with audit reason' })
  @ApiResponse({ status: 200, description: 'Record corrected', type: AttendanceRecordResponseDto })
  async correctRecord(
    @Param('id') id: string,
    @Body() dto: CorrectAttendanceDto,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<AttendanceRecordResponseDto> {
    return this.correctAttendanceHandler.execute(new CorrectAttendanceCommand(id, dto, user.id));
  }

  @Auth()
  @Get('records/:id')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get single attendance record by ID' })
  @ApiResponse({ status: 200, description: 'Record details', type: AttendanceRecordResponseDto })
  async getRecord(@Param('id') id: string): Promise<AttendanceRecordResponseDto> {
    return this.getAttendanceHandler.execute(new GetAttendanceQuery(id));
  }

  @Auth()
  @Get('records')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List attendance history with status & mode filters' })
  @ApiResponse({ status: 200, description: 'Paginated attendance history' })
  async getHistory(
    @Query('studentId') studentId?: string,
    @Query('batchId') batchId?: string,
    @Query('status') status?: AttendanceStatus,
    @Query('mode') mode?: AttendanceMode,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ): Promise<{ items: AttendanceRecordResponseDto[]; total: number }> {
    return this.getHistoryHandler.execute(
      new GetAttendanceHistoryQuery({
        studentId,
        batchId,
        status,
        mode,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        skip: skip ? Number(skip) : 0,
        take: take ? Number(take) : 20,
      }),
    );
  }

  @Auth()
  @Get('students/:studentId')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get detailed attendance for a specific student' })
  @ApiResponse({ status: 200, description: 'Student attendance records' })
  async getStudentAttendance(
    @Param('studentId') studentId: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ): Promise<AttendanceRecordResponseDto[]> {
    return this.getStudentAttendanceHandler.execute(
      new GetStudentAttendanceQuery(
        studentId,
        startDate ? new Date(startDate) : undefined,
        endDate ? new Date(endDate) : undefined,
      ),
    );
  }

  @Auth()
  @Get('classes/:classId')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get attendance records for a specific class' })
  @ApiResponse({ status: 200, description: 'Class attendance records' })
  async getClassAttendance(
    @Param('classId') classId: string,
    @Query('date') dateStr?: string,
  ): Promise<AttendanceRecordResponseDto[]> {
    return this.getClassAttendanceHandler.execute(
      new GetClassAttendanceQuery(classId, dateStr ? new Date(dateStr) : undefined),
    );
  }

  @Auth()
  @Get('daily')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get daily attendance view for a batch' })
  @ApiResponse({ status: 200, description: 'Daily attendance records' })
  async getDaily(
    @Query('batchId') batchId: string,
    @Query('date') dateStr?: string,
  ): Promise<AttendanceRecordResponseDto[]> {
    const date = dateStr ? new Date(dateStr) : new Date();
    return this.getDailyHandler.execute(new GetDailyAttendanceQuery(batchId, date));
  }

  @Auth()
  @Post('sessions/:id/close')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Close attendance session' })
  @ApiResponse({ status: 200, description: 'Session closed' })
  async closeSession(@Param('id') id: string): Promise<{ message: string }> {
    return this.closeSessionHandler.execute(new CloseSessionCommand(id));
  }

  // ==================== LEAVE ENDPOINTS ====================

  @Auth()
  @Post('leaves')
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Apply for leave (Student or Teacher)' })
  @ApiResponse({ status: 201, description: 'Leave request submitted', type: LeaveRequestResponseDto })
  async applyLeave(@Body() dto: ApplyLeaveDto): Promise<LeaveRequestResponseDto> {
    return this.applyLeaveHandler.execute(new ApplyLeaveCommand(dto));
  }

  @Auth()
  @Put('leaves/:id/approve')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Approve leave request' })
  @ApiResponse({ status: 200, description: 'Leave request approved', type: LeaveRequestResponseDto })
  async approveLeave(
    @Param('id') id: string,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<LeaveRequestResponseDto> {
    const { result } = await this.approveLeaveHandler.execute(new ApproveLeaveCommand(id, user.id));
    return result;
  }

  @Auth()
  @Put('leaves/:id/reject')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Reject leave request with reason' })
  @ApiResponse({ status: 200, description: 'Leave request rejected', type: LeaveRequestResponseDto })
  async rejectLeave(
    @Param('id') id: string,
    @Body() dto: RejectLeaveDto,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<LeaveRequestResponseDto> {
    return this.rejectLeaveHandler.execute(new RejectLeaveCommand(id, dto.rejectionReason, user?.id));
  }

  @Auth()
  @Put('leaves/:id/cancel')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cancel active or pending leave request' })
  @ApiResponse({ status: 200, description: 'Leave request cancelled', type: LeaveRequestResponseDto })
  async cancelLeave(
    @Param('id') id: string,
    @Body() dto: CancelLeaveDto,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<LeaveRequestResponseDto> {
    return this.cancelLeaveHandler.execute(new CancelLeaveCommand(id, user.id, dto));
  }

  // ==================== HOLIDAY ENDPOINTS ====================

  @Auth()
  @Post('holidays')
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create academic/national/school holiday' })
  @ApiResponse({ status: 201, description: 'Holiday created', type: HolidayResponseDto })
  async createHoliday(@Body() dto: CreateHolidayDto): Promise<HolidayResponseDto> {
    return this.createHolidayHandler.execute(new CreateHolidayCommand(dto));
  }

  @Auth()
  @Put('holidays/:id')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update holiday entry' })
  @ApiResponse({ status: 200, description: 'Holiday updated', type: HolidayResponseDto })
  async updateHoliday(@Param('id') id: string, @Body() dto: UpdateHolidayDto): Promise<HolidayResponseDto> {
    return this.updateHolidayHandler.execute(new UpdateHolidayCommand(id, dto));
  }

  @Auth()
  @Delete('holidays/:id')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete holiday entry' })
  @ApiResponse({ status: 200, description: 'Holiday deleted' })
  async deleteHoliday(@Param('id') id: string): Promise<{ success: boolean; id: string }> {
    return this.deleteHolidayHandler.execute(new DeleteHolidayCommand(id));
  }

  @Auth()
  @Get('holidays/calendar')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get academic holiday calendar' })
  @ApiResponse({ status: 200, description: 'Academic calendar holidays', type: [HolidayResponseDto] })
  async getCalendar(
    @Query('year') year?: number,
    @Query('month') month?: number,
  ): Promise<HolidayResponseDto[]> {
    return this.getAcademicCalendarHandler.execute(
      new GetAcademicCalendarQuery(year ? Number(year) : undefined, month ? Number(month) : undefined),
    );
  }

  // ==================== ANALYTICS ENDPOINTS ====================

  @Auth()
  @Get('analytics/dashboard')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get attendance dashboard stats & trends' })
  @ApiResponse({ status: 200, description: 'Attendance dashboard metrics', type: AttendanceDashboardResponseDto })
  async getDashboard(
    @Query('organizationId') organizationId?: string,
    @Query('batchId') batchId?: string,
    @Query('period') period?: string,
  ): Promise<AttendanceDashboardResponseDto> {
    return this.getDashboardHandler.execute(new GetAttendanceDashboardQuery(organizationId, batchId, period));
  }

  @Auth()
  @Get('summary/:studentId')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get student attendance percentage & summary metrics' })
  @ApiResponse({ status: 200, description: 'Attendance summary', type: AttendanceSummaryResponseDto })
  async getSummary(
    @Param('studentId') studentId: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ): Promise<AttendanceSummaryResponseDto> {
    return this.getSummaryHandler.execute(
      new GetAttendanceSummaryQuery(
        studentId,
        startDate ? new Date(startDate) : undefined,
        endDate ? new Date(endDate) : undefined,
      ),
    );
  }

  @Auth()
  @Get('analytics/defaulters')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get attendance defaulters report (< threshold percentage)' })
  @ApiResponse({ status: 200, description: 'Defaulter list', type: DefaulterReportResponseDto })
  async getDefaulters(
    @Query('batchId') batchId?: string,
    @Query('classId') classId?: string,
    @Query('threshold') threshold?: number,
  ): Promise<DefaulterReportResponseDto> {
    return this.getDefaultersHandler.execute(
      new GetDefaultersReportQuery(batchId, classId, threshold ? Number(threshold) : 75.0),
    );
  }

  @Auth()
  @Get('analytics/monthly')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get monthly attendance report' })
  @ApiResponse({ status: 200, description: 'Monthly attendance summaries' })
  async getMonthly(
    @Query('year') year: number,
    @Query('month') month: number,
    @Query('batchId') batchId?: string,
  ): Promise<AttendanceSummaryResponseDto[]> {
    return this.getMonthlyReportHandler.execute(
      new GetMonthlyReportQuery(Number(year || 2026), Number(month || 7), batchId),
    );
  }

  @Auth()
  @Get('analytics/heatmap/:entityId')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get attendance heatmap matrix for a student or batch' })
  @ApiResponse({ status: 200, description: 'Attendance heatmap data', type: AttendanceHeatmapResponseDto })
  async getHeatmap(
    @Param('entityId') entityId: string,
    @Query('period') period?: string,
  ): Promise<AttendanceHeatmapResponseDto> {
    return this.getHeatmapHandler.execute(
      new GetAttendanceHeatmapQuery(entityId, period || new Date().toISOString().substring(0, 7)),
    );
  }
}

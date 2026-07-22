import { Provider } from '@nestjs/common';
import { ATTENDANCE_REPOSITORY_TOKEN } from './constants/attendance.constants';
import { AttendanceRepository } from './repositories/attendance.repository';

// Support Services
import { AttendanceIntegrationService } from './application/services/attendance-integration.service';
import { AttendanceAnalyticsService } from './application/services/attendance-analytics.service';
import { GeofenceVerifierService } from './application/services/geofence-verifier.service';
import { QrAttendanceService } from './application/services/qr-attendance.service';
import { BiometricIntegrationService } from './application/services/biometric-integration.service';

// Command Handlers
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

// Query Handlers
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

export const ATTENDANCE_PROVIDERS: Provider[] = [
  AttendanceRepository,
  {
    provide: ATTENDANCE_REPOSITORY_TOKEN,
    useClass: AttendanceRepository,
  },
  // Services
  AttendanceIntegrationService,
  AttendanceAnalyticsService,
  GeofenceVerifierService,
  QrAttendanceService,
  BiometricIntegrationService,

  // Command Handlers
  CreateSessionHandler,
  MarkAttendanceHandler,
  BulkAttendanceHandler,
  CorrectAttendanceHandler,
  CloseSessionHandler,
  ApplyLeaveHandler,
  ApproveLeaveHandler,
  RejectLeaveHandler,
  CancelLeaveHandler,
  CreateHolidayHandler,
  UpdateHolidayHandler,
  DeleteHolidayHandler,

  // Query Handlers
  GetAttendanceHandler,
  GetAttendanceHistoryHandler,
  GetStudentAttendanceHandler,
  GetClassAttendanceHandler,
  GetDailyAttendanceHandler,
  GetAttendanceSummaryHandler,
  GetAcademicCalendarHandler,
  GetAttendanceDashboardHandler,
  GetDefaultersReportHandler,
  GetMonthlyReportHandler,
  GetAttendanceHeatmapHandler,
];

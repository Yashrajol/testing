import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { APP_GUARD, APP_FILTER, APP_INTERCEPTOR, Reflector } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { LoggerModule, CorrelationIdMiddleware, RequestLoggerMiddleware } from '@vedhkrit/logging';
import { GlobalExceptionFilter } from '@vedhkrit/exceptions';
import { CacheModule } from '@vedhkrit/cache';
import { StorageModule } from '@vedhkrit/storage';
import { MessagingModule } from '@vedhkrit/messaging';
import { EventsModule } from '@vedhkrit/events';
import { AuditingModule, AuditInterceptor } from '@vedhkrit/auditing';
import { TelemetryModule } from '@vedhkrit/telemetry';

import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { StudentPortalModule } from './student-portal/student-portal.module';
import { AssessmentsModule } from './assessments/assessments.module';
import { GoalsModule } from './goals/goals.module';
import { SessionsModule } from './sessions/sessions.module';
import { AuthModule } from './modules/auth/auth.module';
import { OrganizationModule } from './modules/organization/organization.module';
import { IdentityModule } from './modules/identity/identity.module';
import { AcademicsModule } from './modules/academics/academics.module';
import { LearningModule } from './modules/learning/learning.module';
import { AssessmentModule } from './modules/assessment/assessment.module';
import { AttendanceModule } from './modules/attendance/attendance.module';
import { AssignmentsModule } from './modules/assignments/assignments.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { LearningDnaModule } from './modules/learning-dna/learning-dna.module';
import { GrowthModule } from './modules/growth/growth.module';
import { GatewayModule } from './modules/gateway/gateway.module';
import { ParentPortalModule } from './parent-portal/parent-portal.module';
import { MentorPortalModule } from './mentor-portal/mentor-portal.module';
import { CmsModule } from './cms/cms.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { ReportingModule } from './modules/reporting/reporting.module';
import { AIModule } from './modules/ai/ai.module';
import { IntegrationsModule } from './modules/integrations/integrations.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
    LoggerModule,
    CacheModule,
    StorageModule,
    MessagingModule,
    EventsModule,
    AuditingModule,
    TelemetryModule,
    PrismaModule,
    StudentPortalModule,
    AssessmentsModule,
    GoalsModule,
    SessionsModule,
    AuthModule,
    OrganizationModule,
    IdentityModule,
    AcademicsModule,
    LearningModule,
    AssessmentModule,
    AttendanceModule,
    AssignmentsModule,
    AnalyticsModule,
    LearningDnaModule,
    GrowthModule,
    GatewayModule,
    ParentPortalModule,
    MentorPortalModule,
    CmsModule,
    NotificationsModule,
    ReportingModule,
    AIModule,
    IntegrationsModule,
  ],
  controllers: [AppController],
  providers: [
    Reflector,
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_FILTER, useClass: GlobalExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: AuditInterceptor },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CorrelationIdMiddleware, RequestLoggerMiddleware)
      .forRoutes('*');
  }
}

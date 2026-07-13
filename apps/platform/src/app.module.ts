import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { StudentPortalModule } from './student-portal/student-portal.module';
import { AssessmentsModule } from './assessments/assessments.module';
import { GoalsModule } from './goals/goals.module';
import { SessionsModule } from './sessions/sessions.module';
import { AuthModule } from './auth/auth.module';
import { ParentPortalModule } from './parent-portal/parent-portal.module';
import { MentorPortalModule } from './mentor-portal/mentor-portal.module';
import { CmsModule } from './cms/cms.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
    PrismaModule,
    StudentPortalModule,
    AssessmentsModule,
    GoalsModule,
    SessionsModule,
    AuthModule,
    ParentPortalModule,
    MentorPortalModule,
    CmsModule,
  ],
  controllers: [AppController],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Shared global custom middleware logging logic can be set up here
  }
}

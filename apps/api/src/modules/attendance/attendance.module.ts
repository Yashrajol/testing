import { Module } from '@nestjs/common';
import { PrismaModule } from '@vedhkrit/database';
import { AppConfigModule } from '@vedhkrit/config';
import { AuthModule } from '../auth/auth.module';
import { AttendanceController } from './attendance.controller';
import { ATTENDANCE_PROVIDERS } from './attendance.providers';
import { ATTENDANCE_REPOSITORY_TOKEN } from './constants/attendance.constants';

@Module({
  imports: [
    PrismaModule,
    AppConfigModule,
    AuthModule,
  ],
  controllers: [AttendanceController],
  providers: ATTENDANCE_PROVIDERS,
  exports: [
    ATTENDANCE_REPOSITORY_TOKEN,
    ...ATTENDANCE_PROVIDERS,
  ],
})
export class AttendanceModule {}

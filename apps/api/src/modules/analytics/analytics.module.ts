import { Module } from '@nestjs/common';
import { PrismaModule } from '@vedhkrit/database';
import { AppConfigModule } from '@vedhkrit/config';
import { AuthModule } from '../auth/auth.module';
import { AnalyticsController } from './analytics.controller';
import { ANALYTICS_PROVIDERS } from './analytics.providers';
import { ANALYTICS_REPOSITORY_TOKEN } from './constants/analytics.constants';

@Module({
  imports: [
    PrismaModule,
    AppConfigModule,
    AuthModule,
  ],
  controllers: [AnalyticsController],
  providers: ANALYTICS_PROVIDERS,
  exports: [
    ANALYTICS_REPOSITORY_TOKEN,
    ...ANALYTICS_PROVIDERS,
  ],
})
export class AnalyticsModule {}

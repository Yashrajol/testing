import { Module } from '@nestjs/common';
import { PrismaModule } from '@vedhkrit/database';
import { AppConfigModule } from '@vedhkrit/config';
import { AuthModule } from '../auth/auth.module';
import { AssessmentController } from './assessment.controller';
import { ASSESSMENT_PROVIDERS } from './assessment.providers';
import { ASSESSMENT_REPOSITORY_TOKEN } from './constants/assessment.constants';

@Module({
  imports: [
    PrismaModule,
    AppConfigModule,
    AuthModule,
  ],
  controllers: [AssessmentController],
  providers: ASSESSMENT_PROVIDERS,
  exports: [
    ASSESSMENT_REPOSITORY_TOKEN,
    ...ASSESSMENT_PROVIDERS,
  ],
})
export class AssessmentModule {}

import { Module } from '@nestjs/common';
import { PrismaModule } from '@vedhkrit/database';
import { AppConfigModule } from '@vedhkrit/config';
import { AuthModule } from '../auth/auth.module';
import { AcademicsController } from './academics.controller';
import { ACADEMICS_PROVIDERS } from './academics.providers';
import { ACADEMICS_REPOSITORY_TOKEN } from './constants/academics.constants';

@Module({
  imports: [
    PrismaModule,
    AppConfigModule,
    AuthModule,
  ],
  controllers: [AcademicsController],
  providers: ACADEMICS_PROVIDERS,
  exports: [
    ACADEMICS_REPOSITORY_TOKEN,
    ...ACADEMICS_PROVIDERS,
  ],
})
export class AcademicsModule {}

import { Module } from '@nestjs/common';
import { PrismaModule } from '@vedhkrit/database';
import { AppConfigModule } from '@vedhkrit/config';
import { AuthModule } from '../auth/auth.module';
import { GrowthController } from './growth.controller';
import { GROWTH_PROVIDERS } from './growth.providers';
import { GROWTH_REPOSITORY_TOKEN } from './constants/growth.constants';

@Module({
  imports: [
    PrismaModule,
    AppConfigModule,
    AuthModule,
  ],
  controllers: [GrowthController],
  providers: GROWTH_PROVIDERS,
  exports: [
    GROWTH_REPOSITORY_TOKEN,
    ...GROWTH_PROVIDERS,
  ],
})
export class GrowthModule {}

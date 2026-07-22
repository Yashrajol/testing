import { Module } from '@nestjs/common';
import { PrismaModule } from '@vedhkrit/database';
import { AppConfigModule } from '@vedhkrit/config';
import { AuthModule } from '../auth/auth.module';
import { LearningController } from './learning.controller';
import { LEARNING_PROVIDERS } from './learning.providers';
import { LEARNING_REPOSITORY_TOKEN } from './constants/learning.constants';

@Module({
  imports: [
    PrismaModule,
    AppConfigModule,
    AuthModule,
  ],
  controllers: [LearningController],
  providers: LEARNING_PROVIDERS,
  exports: [
    LEARNING_REPOSITORY_TOKEN,
    ...LEARNING_PROVIDERS,
  ],
})
export class LearningModule {}

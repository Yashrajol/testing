import { Module } from '@nestjs/common';
import { PrismaModule } from '@vedhkrit/database';
import { AppConfigModule } from '@vedhkrit/config';
import { EventsModule } from '@vedhkrit/events';
import { AuthModule } from '../auth/auth.module';
import { GrowthModule } from '../growth/growth.module';
import { LearningDnaController } from './learning-dna.controller';
import { LEARNING_DNA_PROVIDERS } from './learning-dna.providers';
import { LEARNING_DNA_REPOSITORY_TOKEN } from './constants/learning-dna.constants';

@Module({
  imports: [
    PrismaModule,
    AppConfigModule,
    EventsModule,
    AuthModule,
    GrowthModule,
  ],
  controllers: [LearningDnaController],
  providers: LEARNING_DNA_PROVIDERS,
  exports: [
    LEARNING_DNA_REPOSITORY_TOKEN,
    ...LEARNING_DNA_PROVIDERS,
  ],
})
export class LearningDnaModule {}

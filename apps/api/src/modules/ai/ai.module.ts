import { Module } from '@nestjs/common';
import { PrismaModule } from '@vedhkrit/database';
import { EventsModule } from '@vedhkrit/events';
import { CacheModule } from '@vedhkrit/cache';
import { MessagingModule } from '@vedhkrit/messaging';
import { AIController } from './ai.controller';
import { aiProviders } from './ai.providers';

@Module({
  imports: [PrismaModule, EventsModule, CacheModule, MessagingModule],
  controllers: [AIController],
  providers: [...aiProviders],
  exports: [...aiProviders],
})
export class AIModule {}

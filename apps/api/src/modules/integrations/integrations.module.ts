import { Module } from '@nestjs/common';
import { PrismaModule } from '@vedhkrit/database';
import { EventsModule } from '@vedhkrit/events';
import { CacheModule } from '@vedhkrit/cache';
import { MessagingModule } from '@vedhkrit/messaging';
import { IntegrationsController } from './integrations.controller';
import { integrationsProviders } from './integrations.providers';

@Module({
  imports: [PrismaModule, EventsModule, CacheModule, MessagingModule],
  controllers: [IntegrationsController],
  providers: [...integrationsProviders],
  exports: [...integrationsProviders],
})
export class IntegrationsModule {}

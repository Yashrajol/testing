import { Module } from '@nestjs/common';
import { PrismaModule } from '@vedhkrit/database';
import { EventsModule } from '@vedhkrit/events';
import { CacheModule } from '@vedhkrit/cache';
import { MessagingModule } from '@vedhkrit/messaging';
import { NotificationsController } from './notifications.controller';
import { notificationsProviders } from './notifications.providers';

@Module({
  imports: [PrismaModule, EventsModule, CacheModule, MessagingModule],
  controllers: [NotificationsController],
  providers: [...notificationsProviders],
  exports: [...notificationsProviders],
})
export class NotificationsModule {}

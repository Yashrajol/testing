import { Module } from '@nestjs/common';
import { PrismaModule } from '@vedhkrit/database';
import { EventsModule } from '@vedhkrit/events';
import { CacheModule } from '@vedhkrit/cache';
import { StorageModule } from '@vedhkrit/storage';
import { MessagingModule } from '@vedhkrit/messaging';
import { ReportingController } from './reporting.controller';
import { reportingProviders } from './reporting.providers';

@Module({
  imports: [PrismaModule, EventsModule, CacheModule, StorageModule, MessagingModule],
  controllers: [ReportingController],
  providers: [...reportingProviders],
  exports: [...reportingProviders],
})
export class ReportingModule {}

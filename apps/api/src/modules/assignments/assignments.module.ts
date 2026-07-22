import { Module } from '@nestjs/common';
import { PrismaModule } from '@vedhkrit/database';
import { EventsModule } from '@vedhkrit/events';
import { CacheModule } from '@vedhkrit/cache';
import { AssignmentsController } from './assignments.controller';
import { assignmentsProviders } from './assignments.providers';

@Module({
  imports: [PrismaModule, EventsModule, CacheModule],
  controllers: [AssignmentsController],
  providers: [...assignmentsProviders],
  exports: [...assignmentsProviders],
})
export class AssignmentsModule {}

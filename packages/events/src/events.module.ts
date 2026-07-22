import { Module, Global } from '@nestjs/common';
import { EventDispatcher } from './events.service';

@Global()
@Module({
  providers: [EventDispatcher],
  exports: [EventDispatcher],
})
export class EventsModule {}

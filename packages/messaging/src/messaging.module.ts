import { Module, Global } from '@nestjs/common';
import { MessageBus } from './messaging.service';

@Global()
@Module({
  providers: [MessageBus],
  exports: [MessageBus],
})
export class MessagingModule {}

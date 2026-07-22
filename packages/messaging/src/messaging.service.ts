import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { EventEmitter } from 'events';

export interface OutboxMessage {
  id: string;
  exchange: string;
  routingKey: string;
  payload: any;
  publishedAt?: Date;
}

@Injectable()
export class MessageBus implements OnModuleInit, OnModuleDestroy {
  private readonly emitter = new EventEmitter();

  async onModuleInit() {
    this.emitter.setMaxListeners(100);
  }

  async publish(exchange: string, routingKey: string, message: any): Promise<boolean> {
    const eventName = `${exchange}:${routingKey}`;
    return this.emitter.emit(eventName, message);
  }

  async subscribe(exchange: string, _queue: string, routingKey: string, handler: (msg: any) => Promise<void>): Promise<void> {
    const eventName = `${exchange}:${routingKey}`;
    this.emitter.on(eventName, async (msg: any) => {
      try {
        await handler(msg);
      } catch {
        // Log or handle dead letter queue fallback
      }
    });
  }

  async onModuleDestroy() {
    this.emitter.removeAllListeners();
  }
}

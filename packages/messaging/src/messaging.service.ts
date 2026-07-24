import { EventEmitter } from 'events';

export interface OutboxMessage {
  id: string;
  exchange: string;
  routingKey: string;
  payload: any;
  publishedAt?: Date;
}

export class MessageBus {
  private readonly emitter = new EventEmitter();

  constructor() {
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

  destroy() {
    this.emitter.removeAllListeners();
  }
}

export const messageBus = new MessageBus();

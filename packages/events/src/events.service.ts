import { Injectable } from '@nestjs/common';
import { EventEmitter } from 'events';

export interface EventMetadata {
  eventId: string;
  version: number;
  occurredOn: Date;
  correlationId?: string;
}

export interface DomainEvent {
  eventName: string;
  aggregateId: string;
  metadata: EventMetadata;
}

export interface IntegrationEvent extends DomainEvent {
  boundedContext: string;
}

@Injectable()
export class EventDispatcher {
  private readonly emitter: EventEmitter;

  constructor() {
    this.emitter = new EventEmitter();
    this.emitter.setMaxListeners(100);
  }

  async publish(event: DomainEvent): Promise<void> {
    this.emitter.emit(event.eventName, event);
  }

  subscribe(eventName: string, handler: (event: DomainEvent) => Promise<void> | void): void {
    this.emitter.on(eventName, handler);
  }
}

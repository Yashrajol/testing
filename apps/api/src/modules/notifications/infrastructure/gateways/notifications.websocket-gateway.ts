import { Injectable, Logger } from '@nestjs/common';

export interface WebSocketClientConnection {
  socketId: string;
  userId: string;
  connectedAt: Date;
}

@Injectable()
export class NotificationsWebSocketGateway {
  private readonly logger = new Logger(NotificationsWebSocketGateway.name);
  private readonly connections = new Map<string, WebSocketClientConnection>();

  registerClient(socketId: string, userId: string): void {
    this.connections.set(userId, {
      socketId,
      userId,
      connectedAt: new Date(),
    });
    this.logger.log(`[WebSocketGateway] Connected client ${socketId} for user ${userId}`);
  }

  unregisterClient(userId: string): void {
    this.connections.delete(userId);
    this.logger.log(`[WebSocketGateway] Disconnected client for user ${userId}`);
  }

  emitToUser(userId: string, event: string, payload: any): boolean {
    const conn = this.connections.get(userId);
    if (conn) {
      this.logger.log(`[WebSocketGateway] Live emitting ${event} to user ${userId} on socket ${conn.socketId}`);
      return true;
    }
    this.logger.debug(`[WebSocketGateway] User ${userId} is currently offline for live socket emission`);
    return false;
  }
}

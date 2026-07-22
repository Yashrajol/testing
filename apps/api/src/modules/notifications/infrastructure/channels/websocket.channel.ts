import { Injectable, Logger } from '@nestjs/common';
import { DispatchChannelPayload } from '../../types/notifications.types';
import { NotificationsWebSocketGateway } from '../gateways/notifications.websocket-gateway';

@Injectable()
export class WebSocketChannel {
  private readonly logger = new Logger(WebSocketChannel.name);

  constructor(private readonly wsGateway: NotificationsWebSocketGateway) {}

  async send(payload: DispatchChannelPayload): Promise<{ success: boolean; providerMsgId?: string }> {
    this.logger.log(`[WebSocketChannel] Emitting live WebSocket notification to user ${payload.recipientId}`);
    const success = this.wsGateway.emitToUser(payload.recipientId, 'notification', payload);
    return { success, providerMsgId: `ws-${payload.notificationId}` };
  }
}

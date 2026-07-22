import { Injectable, Logger } from '@nestjs/common';
import { DispatchChannelPayload } from '../../types/notifications.types';

@Injectable()
export class PushChannel {
  private readonly logger = new Logger(PushChannel.name);

  async send(payload: DispatchChannelPayload): Promise<{ success: boolean; providerMsgId?: string }> {
    this.logger.log(`[PushChannel] Sending Push Notification to recipient ${payload.recipientId}: Title "${payload.title}"`);
    return { success: true, providerMsgId: `fcm-${Math.random().toString(36).substring(2)}` };
  }
}

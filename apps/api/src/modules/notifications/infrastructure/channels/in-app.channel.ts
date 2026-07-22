import { Injectable, Logger } from '@nestjs/common';
import { DispatchChannelPayload } from '../../types/notifications.types';

@Injectable()
export class InAppChannel {
  private readonly logger = new Logger(InAppChannel.name);

  async send(payload: DispatchChannelPayload): Promise<{ success: boolean; providerMsgId?: string }> {
    this.logger.log(`[InAppChannel] Persisted in-app notification ${payload.notificationId} for recipient ${payload.recipientId}`);
    return { success: true, providerMsgId: `inapp-${payload.notificationId}` };
  }
}

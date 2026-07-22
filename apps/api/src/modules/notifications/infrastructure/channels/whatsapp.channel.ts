import { Injectable, Logger } from '@nestjs/common';
import { DispatchChannelPayload } from '../../types/notifications.types';

@Injectable()
export class WhatsAppChannel {
  private readonly logger = new Logger(WhatsAppChannel.name);

  async send(payload: DispatchChannelPayload): Promise<{ success: boolean; providerMsgId?: string }> {
    this.logger.log(`[WhatsAppChannel] Sending WhatsApp message to recipient ${payload.recipientId}: "${payload.body}"`);
    return { success: true, providerMsgId: `wa-${Math.random().toString(36).substring(2)}` };
  }
}

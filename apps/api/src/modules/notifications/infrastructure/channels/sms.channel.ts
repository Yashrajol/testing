import { Injectable, Logger } from '@nestjs/common';
import { DispatchChannelPayload } from '../../types/notifications.types';

@Injectable()
export class SmsChannel {
  private readonly logger = new Logger(SmsChannel.name);

  async send(payload: DispatchChannelPayload): Promise<{ success: boolean; providerMsgId?: string }> {
    this.logger.log(`[SmsChannel] Sending SMS to recipient ${payload.recipientId}: "${payload.body}"`);
    return { success: true, providerMsgId: `sms-${Math.random().toString(36).substring(2)}` };
  }
}

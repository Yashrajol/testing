import { Injectable, Logger } from '@nestjs/common';
import { DispatchChannelPayload } from '../../types/notifications.types';

@Injectable()
export class EmailChannel {
  private readonly logger = new Logger(EmailChannel.name);

  async send(payload: DispatchChannelPayload): Promise<{ success: boolean; providerMsgId?: string }> {
    this.logger.log(`[EmailChannel] Sending HTML Email to recipient ${payload.recipientId}: Subject "${payload.title}"`);
    return { success: true, providerMsgId: `email-${Math.random().toString(36).substring(2)}` };
  }
}

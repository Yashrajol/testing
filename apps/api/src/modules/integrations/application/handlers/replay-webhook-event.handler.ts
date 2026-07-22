import { Injectable, Logger } from '@nestjs/common';
import { ReplayWebhookEventCommand } from '../commands/replay-webhook-event.command';
import { WebhookDispatcherService } from '../services/webhook-dispatcher.service';

@Injectable()
export class ReplayWebhookEventHandler {
  private readonly logger = new Logger(ReplayWebhookEventHandler.name);

  constructor(private readonly webhookDispatcher: WebhookDispatcherService) {}

  async execute(command: ReplayWebhookEventCommand): Promise<{ success: boolean; message: string }> {
    this.logger.log(`[ReplayWebhookEventHandler] Replaying event ID ${command.dto.eventId}`);

    // In a real database, we would query the webhook delivery log or outbox log table.
    // For simulation, we re-dispatch a simulated payload for that event ID.
    await this.webhookDispatcher.dispatch('student.registered', {
      replayedEventId: command.dto.eventId,
      replayedAt: new Date(),
      studentId: 'student-replayed-123',
    });

    return {
      success: true,
      message: `Event ${command.dto.eventId} has been queued for redelivery.`,
    };
  }
}

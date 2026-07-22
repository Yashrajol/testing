import { TriggerWebhookReplayDto } from '../dtos/manage-webhook.dto';

export class ReplayWebhookEventCommand {
  constructor(public readonly dto: TriggerWebhookReplayDto) {}
}

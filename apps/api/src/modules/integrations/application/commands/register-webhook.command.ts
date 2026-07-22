import { RegisterWebhookDto } from '../dtos/manage-webhook.dto';

export class RegisterWebhookCommand {
  constructor(public readonly dto: RegisterWebhookDto) {}
}

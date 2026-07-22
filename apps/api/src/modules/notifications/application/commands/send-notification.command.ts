import { SendNotificationDto } from '../dtos/notification-request.dto';

export class SendNotificationCommand {
  constructor(public readonly dto: SendNotificationDto) {}
}

import { CreateAnnouncementDto } from '../dtos/announcement-dto';

export class CreateAnnouncementCommand {
  constructor(public readonly dto: CreateAnnouncementDto, public readonly authorId: string) {}
}

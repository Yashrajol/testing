import { CreateSessionDto } from '../dtos/attendance-request.dto';

export class CreateSessionCommand {
  constructor(public readonly dto: CreateSessionDto, public readonly createdById?: string) {}
}

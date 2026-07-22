import { CreateGoalDto } from '../dtos/growth-request.dto';

export class CreateGoalCommand {
  constructor(public readonly dto: CreateGoalDto) {}
}

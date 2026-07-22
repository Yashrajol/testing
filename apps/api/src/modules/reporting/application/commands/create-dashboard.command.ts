import { CreateDashboardDto } from '../dtos/dashboard-dto';

export class CreateDashboardCommand {
  constructor(public readonly dto: CreateDashboardDto, public readonly ownerId?: string) {}
}

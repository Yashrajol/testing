import { AddWidgetDto } from '../dtos/dashboard-dto';

export class AddWidgetCommand {
  constructor(public readonly dashboardId: string, public readonly dto: AddWidgetDto) {}
}

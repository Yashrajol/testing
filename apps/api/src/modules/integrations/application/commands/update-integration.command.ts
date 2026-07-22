import { UpdateIntegrationDto } from '../dtos/manage-integration.dto';

export class UpdateIntegrationCommand {
  constructor(public readonly id: string, public readonly dto: UpdateIntegrationDto) {}
}

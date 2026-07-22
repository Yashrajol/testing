import { CreateIntegrationDto } from '../dtos/manage-integration.dto';

export class CreateIntegrationCommand {
  constructor(public readonly dto: CreateIntegrationDto) {}
}

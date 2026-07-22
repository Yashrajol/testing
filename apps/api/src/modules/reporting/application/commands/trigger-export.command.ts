import { TriggerExportDto } from '../dtos/trigger-export.dto';

export class TriggerExportCommand {
  constructor(public readonly dto: TriggerExportDto, public readonly requestedBy: string) {}
}

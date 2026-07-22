import { UpdatePreferenceDto } from '../dtos/preference-dto';

export class UpdatePreferenceCommand {
  constructor(public readonly userId: string, public readonly dto: UpdatePreferenceDto) {}
}

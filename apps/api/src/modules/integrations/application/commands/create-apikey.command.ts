import { CreateApiKeyDto } from '../dtos/manage-apikey.dto';

export class CreateApiKeyCommand {
  constructor(public readonly dto: CreateApiKeyDto) {}
}

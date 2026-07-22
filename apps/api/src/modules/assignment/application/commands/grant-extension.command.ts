import { GrantExtensionDto } from '../dtos/assignment-request.dto';

export class GrantExtensionCommand {
  constructor(
    public readonly dto: GrantExtensionDto,
    public readonly grantedBy: string,
  ) {}
}

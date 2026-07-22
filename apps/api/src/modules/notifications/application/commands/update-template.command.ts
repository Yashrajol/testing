import { UpdateTemplateDto } from '../dtos/template-dto';

export class UpdateTemplateCommand {
  constructor(public readonly id: string, public readonly dto: UpdateTemplateDto) {}
}

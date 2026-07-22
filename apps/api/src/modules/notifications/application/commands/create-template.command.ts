import { CreateTemplateDto } from '../dtos/template-dto';

export class CreateTemplateCommand {
  constructor(public readonly dto: CreateTemplateDto) {}
}

import { AcademicEntityType } from '../../constants/academics.constants';

export class UpdateAcademicEntityCommand {
  constructor(
    public readonly entityType: AcademicEntityType,
    public readonly id: string,
    public readonly updates: any,
  ) {}
}

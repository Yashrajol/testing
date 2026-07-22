import { AcademicEntityType } from '../../constants/academics.constants';

export class CreateAcademicEntityCommand {
  constructor(
    public readonly entityType: AcademicEntityType,
    public readonly payload: any,
  ) {}
}

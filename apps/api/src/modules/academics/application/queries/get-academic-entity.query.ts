import { AcademicEntityType } from '../../constants/academics.constants';

export class GetAcademicEntityQuery {
  constructor(
    public readonly entityType: AcademicEntityType,
    public readonly id: string,
  ) {}
}

import { AcademicEntityType } from '../../constants/academics.constants';

export class ArchiveAcademicEntityCommand {
  constructor(
    public readonly entityType: AcademicEntityType,
    public readonly id: string,
    public readonly archivedBy: string,
  ) {}
}

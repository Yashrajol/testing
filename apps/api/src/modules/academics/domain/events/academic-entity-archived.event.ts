import { AcademicEntityType } from '../../constants/academics.constants';

export class AcademicEntityArchivedEvent {
  constructor(
    public readonly entityId: string,
    public readonly entityType: AcademicEntityType,
    public readonly archivedBy: string,
    public readonly timestamp: Date = new Date(),
  ) {}
}

import { AcademicEntityType } from '../../constants/academics.constants';

export class AcademicEntityUpdatedEvent {
  constructor(
    public readonly entityId: string,
    public readonly entityType: AcademicEntityType,
    public readonly updatedFields: string[],
    public readonly timestamp: Date = new Date(),
  ) {}
}

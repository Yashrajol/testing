import { AcademicEntityType } from '../../constants/academics.constants';

export class AcademicEntityCreatedEvent {
  constructor(
    public readonly entityId: string,
    public readonly entityType: AcademicEntityType,
    public readonly name: string,
    public readonly timestamp: Date = new Date(),
  ) {}
}

import { AcademicEntityType } from '../../constants/academics.constants';

export class AcademicNotFoundException extends Error {
  constructor(entityType: AcademicEntityType, identifier: string) {
    super(`${entityType} not found for identifier: ${identifier}`);
    this.name = 'AcademicNotFoundException';
  }
}

import { AcademicEntityType } from '../../constants/academics.constants';

export class AcademicEntityResponseDto {
  id!: string;
  entityType!: AcademicEntityType;
  name!: string;
  details?: Record<string, any>;
  createdAt!: Date;
  updatedAt!: Date;
}

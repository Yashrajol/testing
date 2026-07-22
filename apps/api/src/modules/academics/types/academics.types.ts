import { AcademicEntityType } from '../constants/academics.constants';

export interface AcademicFilterOptions {
  entityType: AcademicEntityType;
  organizationId?: string;
  schoolId?: string;
  campusId?: string;
  academicYearId?: string;
  classId?: string;
  sectionId?: string;
  batchId?: string;
  search?: string;
  skip?: number;
  take?: number;
}

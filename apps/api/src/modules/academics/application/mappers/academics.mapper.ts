import { AcademicEntityType } from '../../constants/academics.constants';
import { AcademicEntityResponseDto } from '../dtos/academics-response.dto';
import { SchoolEntity } from '../../domain/entities/school.entity';
import { CampusEntity } from '../../domain/entities/campus.entity';
import { AcademicYearEntity } from '../../domain/entities/academic-year.entity';
import { AcademicTermEntity } from '../../domain/entities/academic-term.entity';
import { ClassEntity } from '../../domain/entities/class.entity';
import { SectionEntity } from '../../domain/entities/section.entity';
import { SubjectEntity } from '../../domain/entities/subject.entity';
import { BatchEntity } from '../../domain/entities/batch.entity';
import { EnrollmentEntity } from '../../domain/entities/enrollment.entity';

export class AcademicsMapper {
  static toResponseDto(type: AcademicEntityType, entity: any): AcademicEntityResponseDto {
    const res: AcademicEntityResponseDto = {
      id: entity.id,
      entityType: type,
      name: entity.name || `Enrollment-${entity.id}`,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      details: {},
    };

    if (entity instanceof SchoolEntity) {
      res.details = { organizationId: entity.organizationId, board: entity.board };
    } else if (entity instanceof CampusEntity) {
      res.details = { schoolId: entity.schoolId };
    } else if (entity instanceof AcademicYearEntity) {
      res.details = { schoolId: entity.schoolId, startDate: entity.startDate, endDate: entity.endDate, status: entity.status };
    } else if (entity instanceof AcademicTermEntity) {
      res.details = { academicYearId: entity.academicYearId, startDate: entity.startDate, endDate: entity.endDate, status: entity.status };
    } else if (entity instanceof ClassEntity) {
      res.details = { code: entity.code, description: entity.description };
    } else if (entity instanceof SectionEntity) {
      res.details = { classId: entity.classId, capacity: entity.capacity };
    } else if (entity instanceof SubjectEntity) {
      res.details = { code: entity.code, description: entity.description };
    } else if (entity instanceof BatchEntity) {
      res.details = { campusId: entity.campusId, academicYearId: entity.academicYearId, sectionId: entity.sectionId };
    } else if (entity instanceof EnrollmentEntity) {
      res.details = { studentId: entity.studentId, classId: entity.classId, sectionId: entity.sectionId, batchId: entity.batchId, academicYearId: entity.academicYearId, rollNumber: entity.rollNumber, admissionDate: entity.admissionDate, status: entity.status };
    }

    return res;
  }
}

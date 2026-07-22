import { ProfileType } from '../../constants/identity.constants';
import { ProfileResponseDto } from '../dtos/profile-response.dto';
import { StudentProfileEntity } from '../../domain/entities/student-profile.entity';
import { TeacherProfileEntity } from '../../domain/entities/teacher-profile.entity';
import { ParentProfileEntity } from '../../domain/entities/parent-profile.entity';
import { MentorProfileEntity } from '../../domain/entities/mentor-profile.entity';
import { StaffProfileEntity } from '../../domain/entities/staff-profile.entity';

export class ProfileMapper {
  static toResponseDto(type: ProfileType, entity: any): ProfileResponseDto {
    const base: ProfileResponseDto = {
      id: entity.id,
      userId: entity.userId,
      type,
      firstName: entity.firstName,
      middleName: entity.middleName,
      lastName: entity.lastName,
      fullName: entity.fullName,
      gender: entity.gender,
      dateOfBirth: entity.dateOfBirth,
      profilePhoto: entity.profilePhoto,
      address: entity.address,
      emergencyContact: entity.emergencyContact,
      bloodGroup: entity.bloodGroup,
      nationality: entity.nationality,
      language: entity.language,
      timezone: entity.timezone,
      metadata: entity.metadata,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      specifics: {},
    };

    if (entity instanceof StudentProfileEntity) {
      base.specifics = {
        admissionNumber: entity.admissionNumber,
        rollNumber: entity.rollNumber,
        organizationId: entity.organizationId,
        schoolId: entity.schoolId,
        grade: entity.grade,
        schoolName: entity.schoolName,
      };
    } else if (entity instanceof TeacherProfileEntity) {
      base.specifics = {
        employeeCode: entity.employeeCode,
        designation: entity.designation,
        specialization: entity.specialization,
        subjects: entity.subjects,
      };
    } else if (entity instanceof ParentProfileEntity) {
      base.specifics = {
        occupation: entity.occupation,
        relationToStudent: entity.relationToStudent,
      };
    } else if (entity instanceof MentorProfileEntity) {
      base.specifics = {
        expertise: entity.expertise,
        yearsOfExperience: entity.yearsOfExperience,
        resumeUrl: entity.resumeUrl,
      };
    } else if (entity instanceof StaffProfileEntity) {
      base.specifics = {
        department: entity.department,
        employeeId: entity.employeeId,
      };
    }

    return base;
  }
}

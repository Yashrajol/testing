import { Provider } from '@nestjs/common';
import { StudentBffService } from './services/student-bff.service';
import { TeacherBffService } from './services/teacher-bff.service';
import { ParentBffService } from './services/parent-bff.service';
import { MentorBffService } from './services/mentor-bff.service';
import { SchoolAdminBffService } from './services/school-admin-bff.service';
import { OrganizationBffService } from './services/organization-bff.service';
import { SuperAdminBffService } from './services/super-admin-bff.service';

export const GATEWAY_PROVIDERS: Provider[] = [
  StudentBffService,
  TeacherBffService,
  ParentBffService,
  MentorBffService,
  SchoolAdminBffService,
  OrganizationBffService,
  SuperAdminBffService,
];

import { Controller, Get, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Auth } from '../auth/security/decorators/auth.decorator';

import { StudentBffService } from './services/student-bff.service';
import { TeacherBffService } from './services/teacher-bff.service';
import { ParentBffService } from './services/parent-bff.service';
import { MentorBffService } from './services/mentor-bff.service';
import { SchoolAdminBffService } from './services/school-admin-bff.service';
import { OrganizationBffService } from './services/organization-bff.service';
import { SuperAdminBffService } from './services/super-admin-bff.service';

import { StudentDashboardResponseDto } from './dtos/student-dashboard-response.dto';
import { TeacherDashboardResponseDto } from './dtos/teacher-dashboard-response.dto';
import { ParentDashboardResponseDto } from './dtos/parent-dashboard-response.dto';
import { MentorDashboardResponseDto } from './dtos/mentor-dashboard-response.dto';
import { SchoolAdminDashboardResponseDto } from './dtos/school-admin-dashboard-response.dto';
import { OrganizationDashboardResponseDto } from './dtos/organization-dashboard-response.dto';
import { SuperAdminDashboardResponseDto } from './dtos/super-admin-dashboard-response.dto';

@ApiTags('API Gateway & BFF Layer')
@Controller('gateway/dashboard')
export class GatewayController {
  constructor(
    private readonly studentBffService: StudentBffService,
    private readonly teacherBffService: TeacherBffService,
    private readonly parentBffService: ParentBffService,
    private readonly mentorBffService: MentorBffService,
    private readonly schoolAdminBffService: SchoolAdminBffService,
    private readonly organizationBffService: OrganizationBffService,
    private readonly superAdminBffService: SuperAdminBffService,
  ) {}

  @Auth()
  @Get('student/:studentId')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Aggregated Student BFF Dashboard' })
  @ApiResponse({ status: 200, type: StudentDashboardResponseDto })
  async getStudentDashboard(@Param('studentId') studentId: string): Promise<StudentDashboardResponseDto> {
    return this.studentBffService.getDashboard(studentId);
  }

  @Auth()
  @Get('teacher/:teacherId')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Aggregated Teacher BFF Dashboard' })
  @ApiResponse({ status: 200, type: TeacherDashboardResponseDto })
  async getTeacherDashboard(@Param('teacherId') teacherId: string): Promise<TeacherDashboardResponseDto> {
    return this.teacherBffService.getDashboard(teacherId);
  }

  @Auth()
  @Get('parent/:parentId/child/:childId')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Aggregated Parent BFF Dashboard' })
  @ApiResponse({ status: 200, type: ParentDashboardResponseDto })
  async getParentDashboard(
    @Param('parentId') parentId: string,
    @Param('childId') childId: string,
  ): Promise<ParentDashboardResponseDto> {
    return this.parentBffService.getDashboard(parentId, childId);
  }

  @Auth()
  @Get('mentor/:mentorId')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Aggregated Mentor BFF Dashboard' })
  @ApiResponse({ status: 200, type: MentorDashboardResponseDto })
  async getMentorDashboard(@Param('mentorId') mentorId: string): Promise<MentorDashboardResponseDto> {
    return this.mentorBffService.getDashboard(mentorId);
  }

  @Auth()
  @Get('school-admin/:schoolId')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Aggregated School Admin BFF Dashboard' })
  @ApiResponse({ status: 200, type: SchoolAdminDashboardResponseDto })
  async getSchoolAdminDashboard(@Param('schoolId') schoolId: string): Promise<SchoolAdminDashboardResponseDto> {
    return this.schoolAdminBffService.getDashboard(schoolId);
  }

  @Auth()
  @Get('organization/:orgId')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Aggregated Organization BFF Dashboard' })
  @ApiResponse({ status: 200, type: OrganizationDashboardResponseDto })
  async getOrganizationDashboard(@Param('orgId') orgId: string): Promise<OrganizationDashboardResponseDto> {
    return this.organizationBffService.getDashboard(orgId);
  }

  @Auth()
  @Get('super-admin')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Aggregated Super Admin BFF Dashboard' })
  @ApiResponse({ status: 200, type: SuperAdminDashboardResponseDto })
  async getSuperAdminDashboard(): Promise<SuperAdminDashboardResponseDto> {
    return this.superAdminBffService.getDashboard();
  }
}

import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { StudentPortalService } from './student-portal.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { AuthService } from '../auth/auth.service';
import { RoleName as Role } from '@vedhkrit/database';
import { Request } from 'express';

@Controller('student-portal')
@UseGuards(AuthGuard, RolesGuard)
export class StudentPortalController {
  constructor(
    private readonly studentPortalService: StudentPortalService,
    private readonly authService: AuthService,
  ) {}

  @Get(':studentId/overview')
  @Roles(Role.STUDENT, Role.PARENT, Role.MENTOR, Role.TEACHER, Role.ADMIN, Role.SUPERADMIN)
  async getOverview(@Param('studentId') studentId: string, @Req() req: Request) {
    await this.authService.assertStudentAccess((req as any).user, studentId);
    return this.studentPortalService.getStudentOverview(studentId);
  }
}

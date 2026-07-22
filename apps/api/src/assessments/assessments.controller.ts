import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { AssessmentsService } from './assessments.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { AuthService } from '../auth/auth.service';
import { RoleName as Role } from '@vedhkrit/database';
import { Request } from 'express';

@Controller('assessments')
@UseGuards(AuthGuard, RolesGuard)
export class AssessmentsController {
  constructor(
    private readonly assessmentsService: AssessmentsService,
    private readonly authService: AuthService,
  ) {}

  @Get(':studentId')
  @Roles(Role.STUDENT, Role.PARENT, Role.MENTOR, Role.TEACHER, Role.ADMIN, Role.SUPERADMIN)
  async getStudentAssessments(@Param('studentId') studentId: string, @Req() req: Request) {
    await this.authService.assertStudentAccess((req as any).user, studentId);
    return this.assessmentsService.getStudentAssessments(studentId);
  }
}

import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { GoalsService } from './goals.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { AuthService } from '../auth/auth.service';
import { Role } from '@prisma/client';
import { Request } from 'express';

@Controller('goals')
@UseGuards(AuthGuard, RolesGuard)
export class GoalsController {
  constructor(
    private readonly goalsService: GoalsService,
    private readonly authService: AuthService,
  ) {}

  @Get(':studentId')
  @Roles(Role.STUDENT, Role.PARENT, Role.MENTOR, Role.TEACHER, Role.ADMIN, Role.SUPERADMIN)
  async getStudentGoals(@Param('studentId') studentId: string, @Req() req: Request) {
    await this.authService.assertStudentAccess((req as any).user, studentId);
    return this.goalsService.getStudentGoals(studentId);
  }
}
